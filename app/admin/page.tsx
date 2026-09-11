import {getChatGPTUser} from '../chatgpt-auth';
import {Header,SignIn} from '../shared';
import {config} from '@/lib/server';
import CommandCenter from './workspace';
export const dynamic='force-dynamic';
export default async function Page(){const u=await getChatGPTUser();if(!u)return <SignIn to="/admin"/>;const owners=String(config().OWNER_EMAILS||'').toLowerCase().split(',').map(x=>x.trim());if(!owners.includes(u.email.toLowerCase()))return <><Header/><main className="page narrow"><div className="panel"><h1 className="detail-title">Operator access required</h1><p className="muted">This account is signed in as {u.email}. The operations workspace is restricted to the configured operator account.</p><a className="button" href="/portal">Open my client portal</a></div></main></>;return <CommandCenter name={u.displayName}/>}
