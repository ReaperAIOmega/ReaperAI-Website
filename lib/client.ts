export async function api(path:string,body?:unknown){const r=await fetch('/api/ros/'+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});const d:any=await r.json();if(!r.ok)throw new Error(d.error||'Request failed.');return d;}
export const statusLabel=(s:string)=>s.split('_').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
export const dateLabel=(s:string)=>new Date(s).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
