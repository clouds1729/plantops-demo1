'use client';

import { useMemo, useState } from 'react';
import { validateRow, type ImportRow } from '@/lib/import-validation';
import { parseCsv, type ParsedLogRow } from '@/lib/imports.parse-logs';
import { loadStore, makeId, saveStore } from '@/lib/store';
import type { DailyLog, LogStatus } from '@/lib/types';

type PreviewRow = ParsedLogRow & {
  validation: { valid: boolean; errors: string[] };
};

const sample = `date,project_code,supplier_name,plant_code,hours_worked,idle_hours,breakdown_hours,description\n2026-05-18,ARE-01,Atlas Plant Hire,AT-EX-01,8,0,0,Excavation works`;

export default function ImportsPage() {
  const [text, setText] = useState(sample);
  const [store, setStore] = useState(loadStore());
  const [preview, setPreview] = useState<PreviewRow[]>([]);

  const refs = useMemo(
    () => ({
      projects: new Set(store.projects.map((p) => p.code)),
      suppliers: new Set(store.suppliers.map((s) => s.name)),
      plants: new Set(store.plants.map((p) => p.plant_code)),
    }),
    [store],
  );

  const handlePreview = () => {
    const rows = parseCsv(text || '');
    const mapped = rows.map((row) => ({
      ...row,
      validation: validateRow(row as ImportRow, refs),
    }));
    setPreview(mapped);
  };

  const importRows = (status: LogStatus) => {
    const validRows = preview.filter((row) => row.validation.valid);

    const logsToAdd: DailyLog[] = validRows.flatMap((row) => {
      const project = store.projects.find((p) => p.code === row.project_code);
      const supplier = store.suppliers.find((s) => s.name === row.supplier_name);
      const plant = store.plants.find((p) => p.plant_code === row.plant_code);

      if (!project || !supplier || !plant) return [];

      return [
        {
          id: makeId('l'),
          date: row.date,
          project_id: project.id,
          supplier_id: supplier.id,
          plant_id: plant.id,
          hours_worked: row.hours_worked,
          idle_hours: row.idle_hours,
          breakdown_hours: row.breakdown_hours,
          description: row.description,
          status,
        },
      ];
    });

    const nextStore = { ...store, logs: [...store.logs, ...logsToAdd] };
    setStore(nextStore);
    saveStore(nextStore);
  };

  const validCount = preview.filter((row) => row.validation.valid).length;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Imports</h1>
      <pre className="card whitespace-pre-wrap text-xs">{sample}</pre>
      <textarea
        className="border p-2 w-full h-40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="space-x-2">
        <button className="bg-slate-900 text-white px-3 py-2 rounded" onClick={handlePreview}>
          Preview
        </button>
        <button
          className="bg-slate-700 text-white px-3 py-2 rounded"
          onClick={() => importRows('draft')}
          disabled={validCount === 0}
        >
          Import as Draft
        </button>
      </div>
      <p className="text-sm">Valid rows: {validCount}</p>
      <div className="space-y-2">
        {preview.map((row, index) => (
          <div key={`${row.project_code}-${index}`} className="card text-sm">
            {row.project_code} / {row.supplier_name} / {row.plant_code} —{' '}
            {row.validation.valid ? 'valid' : row.validation.errors.join('; ')}
          </div>
        ))}
      </div>
    </div>
  );
}
