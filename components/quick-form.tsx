'use client'
import { useState } from 'react'
export function QuickForm({title,fields}:{title:string,fields:string[]}){
  const [msg,setMsg]=useState('')
  return <form className='card space-y-2' onSubmit={(e)=>{e.preventDefault();setMsg('Saved (demo).')}}>
    <h2 className='font-semibold'>{title}</h2>
    {fields.map(f=><input key={f} placeholder={f} className='w-full border rounded p-2'/>) }
    <button className='px-3 py-2 bg-slate-900 text-white rounded'>Save</button>{msg&&<p className='text-green-700 text-sm'>{msg}</p>}
  </form>
}
