'use client';
import {useState} from 'react';
export function SignOut(){const [error,setError]=useState(false);return <><button className="small muted" onClick={async()=>{try{const r=await fetch('/api/auth/logout',{method:'POST'});if(!r.ok)throw Error();window.location.assign('/login');}catch{setError(true)}}}>Sign out</button>{error&&<span role="alert">Sign-out failed. Please retry.</span>}</>}
