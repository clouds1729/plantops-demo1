'use client';

import { useState } from 'react';
import { loadStore, makeId, saveStore } from '@/lib/store';
import type { DailyLog, DemoStore } from '@/lib/types';

export default function LogsPage() {
  const [store, setStore] = useState(loadStore());
  const [form, setForm] = useState<Omit<DailyLog, 'id'>>({
    date: '',
    project_id: store.projects[0]?.id ?? '',
    supplier_id: store.suppliers[0]?.id ?? '',
    plant_id: store.plants[0]?.id ?? '',
    hours_worked: 0,
    idle_hours: 0,
    breakdown_hours: 0,
    description: '',
    status: 'draft',
  });

  const create = () => {
    if (!form.date || form.hours_worked < 0) return;
    const next: DemoStore = { ...store, logs: [...store.logs, { ...form, id: makeId('l') }] };
    setStore(next);
    saveStore(next);
  };

  const submit = (id: string) => {
    const nextLogs: DailyLog[] = store.logs.map((l) =>
      l.id === id && l.status === 'draft' ? { ...l, status: 'submitted' as const } : l,
    );
    const next: DemoStore = { ...store, logs: nextLogs };
    setStore(next);
    saveStore(next);
  };

  return <div><h1 className='text-2xl font-bold'>Daily Logs</h1><div className='card'><input type='date' onChange={e=>setForm({...form,date:e.target.value})}/><input type='number' placeholder='hours' onChange={e=>setForm({...form,hours_worked:Number(e.target.value)})}/><input placeholder='description' onChange={e=>setForm({...form,description:e.target.value})}/><button onClick={create}>Create draft</button></div>{store.logs.map(l=><div key={l.id} className='card'>{l.date} {l.description} ({l.status}) {l.status==='draft'&&<button onClick={()=>submit(l.id)}>Submit</button>}</div>)}</div>;
}
