'use client'
import { useMemo } from 'react'
import { loadStore } from '@/lib/store'
export default function D(){const s=loadStore();const stats=useMemo(()=>({
'Active Projects':s.projects.filter(p=>p.status==='active').length,
'Plants':s.plants.length,
'Suppliers':s.suppliers.length,
'Pending Approvals':s.logs.filter(l=>l.status==='submitted').length,
'Approved Hours':s.logs.filter(l=>l.status==='approved').reduce((a,b)=>a+b.hours_worked,0),
'IPC This Month':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(s.ipcs.reduce((a,b)=>a+b.total,0))
}),[s])
return <div className='space-y-4'><h1 className='text-2xl font-bold'>Dashboard</h1><div className='grid grid-cols-3 gap-3'>{Object.entries(stats).map(([k,v])=><div key={k} className='card'><p className='text-xs text-slate-500'>{k}</p><p className='text-2xl font-bold'>{v as any}</p></div>)}</div><div className='card'><h2 className='font-semibold mb-2'>Recent activity</h2>{s.logs.slice(0,5).map(l=><p key={l.id}>{l.date}: {l.description} ({l.status})</p>)}</div></div>}
