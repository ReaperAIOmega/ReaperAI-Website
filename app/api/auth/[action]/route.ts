import {cookies} from 'next/headers';
import {authConfig,authRequest,SESSION_COOKIE,sessionCookie} from '@/lib/client-auth';
export const dynamic='force-dynamic';
const reply=(body:unknown,status=200,cookie?:string)=>Response.json(body,{status,headers:{'Cache-Control':'no-store',...(cookie?{'Set-Cookie':cookie}:{})}});
export async function POST(r:Request){
 // Browser-only mutation routes require an explicit same-origin request.
 if(r.headers.get('origin')!==new URL(r.url).origin||r.headers.get('sec-fetch-site')==='cross-site')return reply({error:'Request rejected.'},403);
 const action=new URL(r.url).pathname.split('/').pop();
 if(action==='logout'){
  const token=(await cookies()).get(SESSION_COOKIE)?.value;
  if(token)try{await authRequest('logout?scope=local',{},token);}catch{}
  return reply({ok:true},200,sessionCookie('',0));
 }
 if(!['send','verify'].includes(action||''))return reply({error:'Not found.'},404);
 if(!authConfig().ready)return reply({error:'Email sign-in is not open yet. Please contact JSS support.'},503);
 if(!r.headers.get('content-type')?.includes('application/json'))return reply({error:'Invalid request.'},415);
 try{
 const raw=await r.text();if(raw.length>2048)return reply({error:'Request too large.'},413);
 const b=JSON.parse(raw);const email=typeof b.email==='string'?b.email.trim().toLowerCase():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return reply({error:'Enter a valid email address.'},400);
 if(action==='send'){
 const {response}=await authRequest('otp',{email,create_user:b.register===true});
 // Keep account existence private. Provider rate limits apply to code requests.
 if(response.status===429)return reply({error:'Please wait before requesting another code.'},429);
 if(response.status>=500)return reply({error:'Email delivery is temporarily unavailable.'},503);
 return reply({ok:true,message:'If this email can sign in, a code will arrive shortly.'});
 }
 if(typeof b.code!=='string'||!/^\d{6,10}$/.test(b.code))return reply({error:'Enter the code from your email.'},400);
 const {response,data}=await authRequest('verify',{email,token:b.code,type:'email'});
 if(!response.ok||!data.access_token)return reply({error:'This code is invalid or expired. Request a new code.'},400);
 // Verify identity with the provider; never trust a decoded browser JWT.
 const checked=await authRequest('user',undefined,data.access_token);
 if(!checked.response.ok||!checked.data.email_confirmed_at||checked.data.email?.toLowerCase()!==email||checked.data.is_anonymous)return reply({error:'Unable to verify this account.'},401);
 return reply({ok:true},200,sessionCookie(data.access_token,Number(data.expires_in)||0));
 }catch{return reply({error:'Unable to complete sign-in. Please try again.'},503);}
}
