# PlantOps Demo MVP

## Setup
1. `npm install`
2. Optional Supabase env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. `npm run dev`

## Demo/Data Mode
- App uses local demo fallback state in `localStorage` via `lib/store.ts`.
- Seed includes Acme Civil Works org context, 2 projects, 3 suppliers, 8 plants, mixed logs, rates (with one intentional missing rate), approvals, and one finalized IPC.
- If Supabase is wired later, replace store adapters with Supabase read/write calls.

## Env Vars
- Supabase vars above are optional for this MVP fallback mode.

## Investor Demo Script
1. Open `/dashboard` for KPI cards + activity.
2. Create/edit records in `/projects`, `/suppliers`, `/plants`, `/rates`.
3. Create draft log in `/logs`, then submit.
4. Approve/reject queue items in `/approvals`.
5. Open `/ipc-preview`, verify warnings for missing rates, finalize valid periods.
6. Inspect finalized IPC and line items in `/ipcs`.
7. Use `/imports` sample CSV, preview validation, import valid rows.
8. Open `/settings/team`, add member and change role.

## Known limitations
- Uses demo local store fallback only (no persistent server DB writes yet).
- IPC tax is placeholder 0.
- CSV parser is intentionally lightweight for demo speed.
