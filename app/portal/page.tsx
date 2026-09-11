import {getChatGPTUser} from '../chatgpt-auth';
import {Header,SignIn} from '../shared';
import Workspace from './workspace';
export const dynamic='force-dynamic';
export default async function Page(){const u=await getChatGPTUser();if(!u)return <SignIn/>;return <><Header/><main className="page"><span className="eyebrow">CLIENT WORKSPACE</span><h1>Your next steps, in one place.</h1><p className="muted">{u.displayName} · <a href="/signout-with-chatgpt?return_to=/" target="_top">Sign out</a></p><Workspace/></main></>}
