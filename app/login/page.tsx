import {Header} from '../shared';
import {LoginForm} from './form';
import {authConfig} from '@/lib/client-auth';

import {LockKeyhole, Mail} from 'lucide-react';

export const metadata = {title:'Client sign in | Johnson Strategic Solutions'};

export const dynamic="force-dynamic";
export default function LoginPage(){
  return <><Header/><main className="page narrow">
    <div className="panel" style={{maxWidth:520,margin:'1rem auto',padding:'clamp(24px,5vw,48px)'}}>
      <span className="eyebrow">JOHNSON STRATEGIC SOLUTIONS</span>
      <h1 className="detail-title" style={{marginTop:20}}>Your client workspace.</h1>
      <p className="muted">Sign in to view your assessment, share documents, and track your next steps.</p>
      <LoginForm ready={authConfig().ready}/>
      <hr style={{margin:'28px 0',borderColor:'var(--border)'}}/>
      <p className="small muted"><LockKeyhole size={16} aria-hidden="true" style={{display:'inline',marginRight:8}}/>Your documents and service updates stay in your private workspace.</p>
      <p className="small" style={{marginTop:20}}>New to JSS? Create an account using your email address.</p>
      <p className="small muted" style={{marginTop:24}}><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:reaperomegaai@gmail.com">Contact support</a></p>
    </div>
  </main></>;
}
