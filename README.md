# PlantOps Demo (Plant_Manager_1)

## Setup
1. `npm install`
2. Set env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. `npm run dev`

## Database
- Run Supabase migration at `supabase/migrations/20260527070000_init.sql`.
- Includes core multi-tenant tables, indexes, basic RLS starter policy, and workflow entities.

## Demo seed data
Use SQL inserts (or your existing seed flow) to create:
- Org: **Acme Civil Works**
- Users: `owner@example.com`, `manager@example.com`, `clerk@example.com`, `supplier@example.com`
- Projects: Airport Road Expansion, North Bridge Repair
- 3 suppliers, 8-12 plants, rates, mixed-status logs, and one finalized IPC.

## Demo script
1. Login
2. View dashboard
3. Create daily log
4. Submit log
5. Approve log
6. Generate IPC preview
7. Finalize IPC
8. Import CSV/XLSX logs

## Known MVP limitations
- Supabase auth + mutations are wired as demo placeholders in UI pages.
- Import page UI is scaffolded; parser/upload workflow should be connected to Supabase storage/server action in your environment.
- RLS is safe-starter and should be expanded for full per-role granularity before production.
