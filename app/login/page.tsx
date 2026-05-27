'use client'
import {useState} from 'react'
export default function Login(){const [m,setM]=useState(''); return <div className='max-w-md card'><h1 className='text-xl font-bold mb-3'>Login</h1><input className='w-full border p-2 mb-2' placeholder='email'/><input className='w-full border p-2 mb-2' placeholder='password' type='password'/><button className='bg-slate-900 text-white rounded px-3 py-2' onClick={()=>setM('Auth wired to Supabase placeholder.')} >Sign in</button><p className='text-sm mt-2'>{m}</p></div>}
