import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Johnson Strategic Solutions | ROSv4',description:'Your business, structured for the next move. Secure intake, readiness planning, and client delivery.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
