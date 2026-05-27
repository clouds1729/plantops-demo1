'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const nav=[['/dashboard','Dashboard'],['/projects','Projects'],['/suppliers','Suppliers'],['/plants','Plants'],['/rates','Rates'],['/logs','Logs'],['/approvals','Approvals'],['/ipc-preview','IPC Preview'],['/ipcs','IPCs'],['/imports','Imports'],['/settings/team','Team Settings']]
export function Sidebar(){const pathname=usePathname(); return <aside className='border-r bg-white p-4 space-y-2'><h1 className='font-bold'>PlantOps Demo</h1><p className='text-xs text-slate-500'>Acme Civil Works</p>{nav.map(([href,label])=>{const active=pathname===href;return <Link key={href} href={href} className={`block text-sm rounded px-2 py-1 ${active?'bg-slate-900 text-white':'hover:bg-slate-100'}`}>{label}</Link>})}</aside>}
