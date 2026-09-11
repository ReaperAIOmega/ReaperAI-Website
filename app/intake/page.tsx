import {getChatGPTUser} from '../chatgpt-auth';
import {Header,SignIn} from '../shared';
import IntakeForm from './form';
export const dynamic='force-dynamic';
export default async function Page(){const u=await getChatGPTUser();if(!u)return <SignIn to="/intake"/>;return <><Header/><main className="page narrow"><div className="eyebrow">START WITH CLARITY</div><h1>Your next move starts here.</h1><p className="lead">Tell us what you want to accomplish. Your initial readiness brief appears immediately after you submit.</p><div className="notice">Your assessment is saved to <strong>{u.email}</strong>. Do not enter Social Security numbers, passwords, or full account numbers.</div><IntakeForm name={u.fullName||''}/></main></>}
