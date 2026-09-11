import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export const config=()=>env as unknown as Record<string,any>;
export function db(){const v=config().DB as D1Database;if(!v)throw new Error('Storage is temporarily unavailable. Please try again.');return v;}
export function bucket(){const v=config().BUCKET as R2Bucket;if(!v)throw new Error('Document storage is temporarily unavailable.');return v;}
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
export async function actor(){const u=await getChatGPTUser();if(!u)throw new ApiError(401,'Sign in to continue.');const allow=String(config().OWNER_EMAILS||'').split(',').map(v=>v.trim().toLowerCase()).filter(Boolean);return {...u,admin:allow.includes(u.email.toLowerCase())};}
export async function admin(){const u=await actor();if(!u.admin)throw new ApiError(403,'This workspace is restricted to the operator.');return u;}
export function safeMutation(r:Request){const origin=r.headers.get('origin');if(origin&&origin!==new URL(r.url).origin)throw new ApiError(403,'Cross-site request rejected.');if(r.headers.get('sec-fetch-site')==='cross-site')throw new ApiError(403,'Cross-site request rejected.');}
export function ok(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
export async function json(r:Request){if(!r.headers.get('content-type')?.includes('application/json'))throw new ApiError(415,'JSON request required.');const raw=await r.text();if(raw.length>20000)throw new ApiError(413,'Request too large.');try{return JSON.parse(raw)}catch{throw new ApiError(400,'Invalid JSON.')}}
export const now=()=>new Date().toISOString();
export const id=()=>crypto.randomUUID();
export function auditStmt(caseId:string|null,actor:string,event:string,detail:string){return db().prepare('INSERT INTO audit(id,case_id,actor,event,detail,created_at) VALUES(?,?,?,?,?,?)').bind(id(),caseId,actor,event,detail,now());}
export async function ownedCase(caseId:string,u:{userId:string,admin:boolean}){const c=await db().prepare('SELECT * FROM cases WHERE id=?').bind(caseId).first<any>();if(!c||(!u.admin&&c.user_id!==u.userId))throw new ApiError(404,'Case not found.');return c;}
export async function setting(key:string,fallback:string){const v=await db().prepare('SELECT value FROM settings WHERE key=?').bind(key).first<any>();return v?.value??fallback;}
export function runtimeReadiness(){const e=config();return {payments:!!e.STRIPE_SECRET_KEY&&!!e.STRIPE_WEBHOOK_SECRET&&e.PAYMENTS_ENABLED==='true'&&e.PROCESSOR_APPROVED==='true',paymentMode:/^[sr]k_live_/.test(e.STRIPE_SECRET_KEY||'')?'live':'test',email:!!e.RESEND_API_KEY&&!!e.EMAIL_FROM&&e.EMAIL_ENABLED==='true',scheduler:!!e.AUTOMATION_TOKEN,ownerConfigured:!!e.OWNER_EMAILS};}
