'use client'
import { useState } from 'react';import { loadStore, makeId, saveStore } from '@/lib/store';
export default function Page(){const [s,setS]=useState(loadStore());const [f,setF]=useState({name:'',contact_email:'',phone:'',address:'',status:'active'});
const add=()=>{if(!f.name){alert('name required');return;}const ns={...s,suppliers:[...s.suppliers,{...f,id:makeId('s')} as any]};setS(ns);saveStore(ns)}
return <div className='space-y-3'><h1 className='text-2xl font-bold'>Suppliers</h1><div className='card'>{Object.keys(f).map(k=><input key={k} placeholder={k} className='border p-2 mr-2' value={(f as any)[k]} onChange={e=>setF({...f,[k]:e.target.value})}/>)}<button className='bg-slate-900 text-white px-3 py-2 rounded' onClick={add}>Create</button></div>{s.suppliers.map(x=><div key={x.id} className='card'>{x.name} | plants: {s.plants.filter(p=>p.supplier_id===x.id).length}</div>)}</div>}
