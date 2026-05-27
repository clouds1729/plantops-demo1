'use client'
import { useState } from 'react';import { loadStore } from '@/lib/store';
export default function Page(){const [s]=useState(loadStore());const [open,setOpen]=useState('');return <div><h1 className='text-2xl font-bold'>IPCs</h1>{s.ipcs.map(i=><div key={i.id} className='card'><button onClick={()=>setOpen(open===i.id?'':i.id)}>{i.number} | {i.status} | {i.start_date} to {i.end_date} | {i.total}</button>{open===i.id&&s.ipcLines.filter(l=>i.line_ids.includes(l.id)).map(l=><p key={l.id}>{l.date} {l.hours}h {l.amount}</p>)}</div>)}</div>}
