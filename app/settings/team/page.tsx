'use client'
import { useState } from 'react';import { loadStore, makeId, saveStore } from '@/lib/store';
export default function T(){const [s,setS]=useState(loadStore());const [email,setEmail]=useState('');const [role,setRole]=useState('viewer');
const add=()=>{const ns={...s,team:[...s.team,{id:makeId('u'),name:email.split('@')[0],email,role} as any]};setS(ns);saveStore(ns)}
const setMemberRole=(id:string,role:string)=>{const ns={...s,team:s.team.map(t=>t.id===id?{...t,role:role as any}:t)};setS(ns);saveStore(ns)}
return <div><h1 className='text-2xl font-bold'>Team Settings</h1><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email'/><select value={role} onChange={e=>setRole(e.target.value)}>{['owner','admin','manager','site_clerk','supplier','viewer'].map(r=><option key={r}>{r}</option>)}</select><button onClick={add}>Add member</button>{s.team.map(m=><div key={m.id}>{m.email}<select value={m.role} onChange={e=>setMemberRole(m.id,e.target.value)}>{['owner','admin','manager','site_clerk','supplier','viewer'].map(r=><option key={r}>{r}</option>)}</select></div>)}</div>}
