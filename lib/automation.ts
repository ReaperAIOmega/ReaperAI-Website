import {db,now,config,auditStmt,runtimeReadiness} from './server';
const DAY=86400000;
// Find the latest applicable stage, anchored to the event that made it due.
// Missing timestamps fail closed; old intake dates never accelerate reminders.
async function reminder(c:any){
 let intake;try{intake=JSON.parse(c.intake);}catch{return null;}
 if(intake.reminders!==true)return null;
 let start:string|undefined,days:number[]=[],kind='',version='';
 if(c.status==='scope_approved'&&c.payment_status==='unpaid'){
  const row=await db().prepare('SELECT value FROM settings WHERE key=?').bind(`scope:${c.id}`).first<any>();
  let scope;try{scope=JSON.parse(row?.value||'null');}catch{return null;}
  start=scope?.createdAt;version=scope?.version;days=[1,3,7];kind='scope';
 }else if(['awaiting_documents','in_progress'].includes(c.status)&&c.payment_status==='paid'){
  const docs=await db().prepare('SELECT count(*) n FROM documents WHERE case_id=?').bind(c.id).first<any>();if(docs?.n>0)return null;
  const payment=await db().prepare('SELECT created_at FROM payments WHERE case_id=? AND livemode=1 ORDER BY created_at LIMIT 1').bind(c.id).first<any>();
  start=payment?.created_at;days=[2,5];kind='documents';version='paid';
 }
 if(!start||!version||!Number.isFinite(Date.parse(start)))return null;
 const age=Date.now()-Date.parse(start);const day=days.filter(d=>age>=d*DAY).at(-1);if(!day)return null;
 return {id:`${c.id}-${kind}-${version}-${day}`,subject:kind==='scope'?'Your service scope is ready':'Documents needed for your review',body:kind==='scope'?`${c.name}, your reviewed service scope is available in your client portal. Review it before deciding whether to proceed.`:`${c.name}, your case is waiting on supporting records. Open your portal to review and upload the relevant documents.`};
}
async function cancel(messageId:string){await db().prepare("UPDATE outbox SET status='cancelled',lease_until=NULL WHERE id=? AND status='pending'").bind(messageId).run();}
export async function processOutbox(send=false){
 const t=now();
 // Prune stale messages even when delivery is disabled. Each case can retain
 // only the latest relevant reminder, so recovering a scheduler never floods it.
 const pending=await db().prepare("SELECT * FROM outbox WHERE status='pending' ORDER BY created_at LIMIT 200").all<any>();
 for(const m of pending.results){const c=await db().prepare('SELECT * FROM cases WHERE id=?').bind(m.case_id).first<any>();const target=c?await reminder(c):null;if(!target||target.id!==m.id||c.email!==m.recipient)await cancel(m.id);}
 const cases=await db().prepare("SELECT * FROM cases WHERE status IN ('scope_approved','awaiting_documents','in_progress') ORDER BY updated_at LIMIT 200").all<any>();
 for(const c of cases.results){const target=await reminder(c);if(!target)continue;
 const last=await db().prepare("SELECT sent_at FROM outbox WHERE case_id=? AND status='sent' ORDER BY sent_at DESC LIMIT 1").bind(c.id).first<any>();if(last?.sent_at&&Date.now()-Date.parse(last.sent_at)<DAY)continue;
 await db().prepare("INSERT OR IGNORE INTO outbox(id,case_id,recipient,subject,body,status,due_at,created_at) VALUES(?,?,?,?,?,'pending',?,?)").bind(target.id,c.id,c.email,target.subject,target.body,t,t).run();}
 if(!send||!runtimeReadiness().email)return {queued:true,sent:0,deliveryEnabled:runtimeReadiness().email};
 const ready=await db().prepare("SELECT * FROM outbox WHERE status='pending' AND due_at<=? AND attempts<5 AND (lease_until IS NULL OR lease_until<?) ORDER BY due_at LIMIT 20").bind(t,t).all<any>();let sent=0;
 for(const m of ready.results){
 const lease=new Date(Date.now()+120000).toISOString();const claim=await db().prepare("UPDATE outbox SET lease_until=?,attempts=attempts+1 WHERE id=? AND status='pending' AND (lease_until IS NULL OR lease_until<?)").bind(lease,m.id,t).run();if(!claim.meta.changes)continue;
 try{
  // Re-check immediately before provider submission: payment, uploads, closure,
  // scope revision and consent can all change while a reminder is queued.
  const c=await db().prepare('SELECT * FROM cases WHERE id=?').bind(m.case_id).first<any>();const target=c?await reminder(c):null;
  if(!target||target.id!==m.id||c.email!==m.recipient){await cancel(m.id);continue;}
  const res=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${config().RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':m.id},body:JSON.stringify({from:config().EMAIL_FROM,to:[m.recipient],subject:m.subject,text:m.body})});if(!res.ok)throw new Error('provider');
  await db().batch([db().prepare("UPDATE outbox SET status='sent',sent_at=?,lease_until=NULL WHERE id=?").bind(now(),m.id),auditStmt(m.case_id,'automation','email_sent',m.id)]);sent++;
 }catch{await db().prepare("UPDATE outbox SET due_at=?,lease_until=NULL,status=CASE WHEN attempts>=5 THEN 'failed' ELSE 'pending' END WHERE id=? AND status='pending'").bind(new Date(Date.now()+Math.min(3600000,2**m.attempts*60000)).toISOString(),m.id).run();}
 }
 return {queued:true,sent,deliveryEnabled:true};
}
