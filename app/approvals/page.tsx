'use client'
import { useState } from 'react';import { loadStore, saveStore, makeId } from '@/lib/store';
export default function Page(){const [s,setS]=useState(loadStore()); const [comment,setComment]=useState('');
const act=(id:string,action:'approved'|'rejected')=>{const ns={...s,logs:s.logs.map(l=>l.id===id?{...l,status:action}:l),approvals:[...s.approvals,{id:makeId('a'),log_id:id,action,comment,at:new Date().toISOString()}]};setS(ns);saveStore(ns)}
return <div><h1 className='text-2xl font-bold'>Approvals</h1><input placeholder='reject comment' className='border p-2' value={comment} onChange={e=>setComment(e.target.value)}/>{s.logs.filter(l=>l.status==='submitted').map(l=><div key={l.id} className='card'>{l.description}<button onClick={()=>act(l.id,'approved')}>Approve</button><button onClick={()=>act(l.id,'rejected')}>Reject</button></div>)}<h2>History</h2>{s.approvals.map(a=><div key={a.id}>{a.action} {a.log_id}</div>)}</div>}
