import {getClientUser} from '@/lib/client-auth';
import {SignOut} from '@/app/logout';
import {Header,SignIn} from '../shared';
import Workspace from './workspace';
export const dynamic='force-dynamic';
export default async function Page(){const u=await getClientUser();if(!u)return <SignIn/>;return <><Header/><main className="page"><span className="eyebrow">CLIENT WORKSPACE</span><h1>Your next steps, in one place.</h1><p className="muted">{u.displayName} · <SignOut/></p><Workspace/></main></>}
