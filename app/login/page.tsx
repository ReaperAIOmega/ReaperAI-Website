import {Header} from '../shared';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {LockKeyhole, Mail} from 'lucide-react';

export const metadata = {title:'Client sign in | Johnson Strategic Solutions'};

// Review surface only. Do not collect credentials until the independent
// identity provider and deployment path have been configured and validated.
export default function LoginPage(){
  return <><Header/><main className="page narrow">
    <div className="panel" style={{maxWidth:520,margin:'1rem auto',padding:'clamp(24px,5vw,48px)'}}>
      <span className="eyebrow">JOHNSON STRATEGIC SOLUTIONS</span>
      <h1 className="detail-title" style={{marginTop:20}}>Your client workspace.</h1>
      <p className="muted">Sign in to view your assessment, share documents, and track your next steps.</p>
      <div className="notice" role="status">Email sign-in is being connected. Account registration is not open yet.</div>
      <label htmlFor="client-email" style={{display:'block',margin:'24px 0 8px'}}>Email address</label>
      <Input id="client-email" type="email" placeholder="you@example.com" autoComplete="email" disabled aria-describedby="login-note" className="h-12 text-base"/>
      <Button disabled className="w-full h-12 mt-4 text-base"><Mail aria-hidden="true"/>Send sign-in code</Button>
      <p id="login-note" className="small muted" style={{marginTop:16}}>Use a one-time email code to access your account. No password to remember.</p>
      <hr style={{margin:'28px 0',borderColor:'var(--border)'}}/>
      <p className="small muted"><LockKeyhole size={16} aria-hidden="true" style={{display:'inline',marginRight:8}}/>Your documents and service updates stay in your private workspace.</p>
      <p className="small" style={{marginTop:20}}>New to JSS? Registration will use the same verified email process.</p>
      <p className="small muted" style={{marginTop:24}}><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:reaperomegaai@gmail.com">Contact support</a></p>
    </div>
  </main></>;
}
