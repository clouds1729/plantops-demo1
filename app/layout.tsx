import './globals.css'
import { Sidebar } from '@/components/sidebar'
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html><body><div className='min-h-screen grid grid-cols-[220px_1fr]'><Sidebar/><main className='p-6'>{children}</main></div></body></html>
}
