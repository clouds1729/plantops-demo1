'use client'
import { useMemo, useState } from 'react'
import { calculateIpcPreview } from '@/lib/ipc'
export default function P(){const [hours,setHours]=useState(8); const rows=useMemo(()=>calculateIpcPreview([{id:'1',hours_worked:hours,rate:120,date:'2026-05-27',plant:'Excavator'}]),[hours]); return <div className='space-y-3'><h1 className='text-2xl font-bold'>IPC Preview</h1><input type='number' value={hours} onChange={e=>setHours(+e.target.value)} className='border p-2 rounded'/><div className='card'>{rows.lines.map(l=><p key={l.id}>{l.plant} {l.amount}</p>)}<p className='font-semibold'>Total {rows.total}</p><button className='bg-slate-900 text-white px-3 py-2 rounded mt-2'>Finalize IPC</button></div></div>}
