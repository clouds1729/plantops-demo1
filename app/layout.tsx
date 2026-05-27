import './globals.css'
import Link from 'next/link'
const nav=['dashboard','projects','suppliers','plants','rates','logs','approvals','ipc-preview','ipcs','imports','settings/team']
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html><body><div className='min-h-screen grid grid-cols-[220px_1fr]'>
    <aside className='border-r bg-white p-4 space-y-2'><h1 className='font-bold'>PlantOps Demo</h1><p className='text-xs text-slate-500'>Acme Civil Works</p>{nav.map(n=><Link key={n} className='block text-sm hover:underline' href={`/${n}`}>{n}</Link>)}</aside>
    <main className='p-6'>{children}</main></div></body></html>
}
