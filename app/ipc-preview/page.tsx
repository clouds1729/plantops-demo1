'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { calculateIpcFromDomain } from '@/lib/ipc';
import { loadStore, makeId, saveStore } from '@/lib/store';
import type { DailyLog, DemoStore, IpcLine } from '@/lib/types';

export default function IpcPreviewPage() {
  const [store, setStore] = useState(loadStore());
  const [project, setProject] = useState(store.projects[0]?.id ?? '');
  const [supplier, setSupplier] = useState(store.suppliers[0]?.id ?? '');
  const [start, setStart] = useState('2026-05-01');
  const [end, setEnd] = useState('2026-05-31');

  const filtered = useMemo(
    () =>
      store.logs.filter(
        (l) =>
          l.project_id === project &&
          l.supplier_id === supplier &&
          l.status === 'approved' &&
          l.date >= start &&
          l.date <= end,
      ),
    [store.logs, project, supplier, start, end],
  );

  const preview = useMemo(
    () => calculateIpcFromDomain(filtered, store.rates, store.plants),
    [filtered, store.rates, store.plants],
  );

  const finalize = () => {
    if (!project || !supplier || preview.warnings.length > 0 || filtered.length === 0) return;

    const ipcId = makeId('i');
    const lines = preview.lines.map((line) => ({
      id: makeId('il'),
      log_id: line.log_id,
      date: line.date,
      plant_id: store.plants.find((p) => p.name === line.plant)?.id ?? '',
      hours: line.hours,
      rate: line.rate,
      amount: line.amount,
    }));

    const updatedLogs: DailyLog[] = store.logs.map((log) =>
      filtered.some((f) => f.id === log.id) ? { ...log, status: 'included_in_ipc' as const } : log,
    );

    const nextStore: DemoStore = {
      ...store,
      ipcLines: [...store.ipcLines, ...lines],
      ipcs: [
        ...store.ipcs,
        {
          id: ipcId,
          number: `IPC-${Date.now()}`,
          project_id: project,
          supplier_id: supplier,
          start_date: start,
          end_date: end,
          status: 'finalized' as const,
          subtotal: preview.subtotal,
          total: preview.total,
          line_ids: lines.map((x) => x.id),
        },
      ],
      logs: updatedLogs,
    };

    setStore(nextStore);
    saveStore(nextStore);
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">IPC Preview</h1>
      <div className="card space-x-2">
        <select value={project} onChange={(e) => setProject(e.target.value)}>{store.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>{store.suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      <button onClick={finalize} disabled={preview.warnings.length > 0 || filtered.length === 0}>Finalize IPC</button>
      <Link href="/ipcs">Go to IPCs</Link>
      {filtered.length === 0 && <p>No approved logs for selection.</p>}
      {preview.warnings.map((w) => <p key={w}>{w}</p>)}
      {preview.lines.map((line) => <div key={line.log_id}>{line.date} {line.plant} {line.hours} x {line.rate} = {line.amount}</div>)}
      <p>Total {preview.total}</p>
    </div>
  );
}
