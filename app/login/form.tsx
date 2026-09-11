'use client';
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
export function LoginForm({ready,to='/portal'}:{ready:boolean,to?:string}){
 const [email,setEmail]=useState(''),[code,setCode]=useState(''),[sent,setSent]=useState(false),[register,setRegister]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[wait,setWait]=useState(false);
 async function send(){setBusy(true);setError('');try{const r=await fetch('/api/auth/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,register})});const d=await r.json() as {error?:string};if(!r.ok)throw Error(d.error||'Unable to complete this request.');setSent(true);setWait(true);setTimeout(()=>setWait(false),60000);}catch(e){setError(e instanceof Error?e.message:'Unable to send code.');}finally{setBusy(false);}}
 async function submit(e:React.FormEvent){e.preventDefault();if(!sent)return send();setBusy(true);setError('');try{const r=await fetch('/api/auth/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,code})});const d=await r.json() as {error?:string};if(!r.ok)throw Error(d.error||'Unable to complete this request.');window.location.assign(['/portal','/intake','/admin'].includes(to)?to:'/portal');}catch(e){setError(e instanceof Error?e.message:'Unable to sign in.');setBusy(false);}}
 return <form onSubmit={submit}>
 {!ready&&<div className="notice" role="status">Email sign-in is being connected. Registration is not open yet.</div>}
 <label htmlFor="jss-email" className="block mt-6 mb-2">Email address</label><Input id="jss-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" required disabled={!ready||sent||busy} className="h-12 text-base"/>
 {sent&&<><p className="small muted mt-4" role="status">If this email can sign in, your code will arrive shortly. Check your inbox and spam folder.</p><label htmlFor="jss-code" className="block mt-4 mb-2">Sign-in code</label><Input id="jss-code" value={code} onChange={e=>setCode(e.target.value)} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,10}" maxLength={10} required autoFocus className="h-12 text-base"/></>}
 {error&&<p role="alert" className="error mt-4">{error}</p>}
 <Button type="submit" disabled={!ready||busy} className="w-full h-12 mt-4 text-base">{busy?'Please wait…':sent?'Open my workspace':register?'Create account with email':'Send sign-in code'}</Button>
 <p className="small muted mt-4">A one-time email code keeps sign-in simple. No password to remember.</p>
 {sent?<div className="flex gap-4 mt-4"><Button type="button" variant="outline" disabled={busy||wait} onClick={send}>Resend code</Button><Button type="button" variant="ghost" disabled={busy} onClick={()=>{setSent(false);setCode('');setError('')}}>Change email</Button></div>:<Button type="button" variant="link" className="mt-4" disabled={busy} onClick={()=>setRegister(!register)}>{register?'Already a client? Sign in':'New to JSS? Create an account'}</Button>}
 </form>;
}
