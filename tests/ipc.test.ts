import { describe,it,expect } from 'vitest';
import { calculateIpcPreview, finalizeIpcPayload } from '@/lib/ipc';
describe('ipc',()=>{it('calculates totals',()=>{const r=calculateIpcPreview([{id:'1',hours_worked:5,rate:100,date:'2026-01-01',plant:'P1'}]);expect(r.total).toBe(500)});
it('missing rate warning',()=>{const r=calculateIpcPreview([{id:'1',hours_worked:5,date:'2026-01-01',plant:'P1'}]);expect(r.warnings.length).toBe(1)});
it('finalize payload',()=>{expect(finalizeIpcPayload('p','s','2026-01-01','2026-01-31')).toEqual({project_id:'p',supplier_id:'s',start_date:'2026-01-01',end_date:'2026-01-31'})})})
