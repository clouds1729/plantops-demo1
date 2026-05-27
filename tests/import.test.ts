import { describe,it,expect } from 'vitest';
import { validateRow } from '@/lib/import-validation';
describe('import validation',()=>{it('flags missing refs',()=>{const r=validateRow({date:'2026-01-01',project_code:'X',supplier_name:'Y',plant_code:'Z',hours_worked:1},{projects:new Set(['A']),suppliers:new Set(['B']),plants:new Set(['C'])});expect(r.valid).toBe(false);expect(r.errors.length).toBe(3)})})
