import * as XLSX from 'xlsx'

export type ParsedLogRow = { date:string; project_code:string; supplier_name:string; plant_code:string; hours_worked:number; idle_hours:number; breakdown_hours:number; description:string }

export function parseCsv(text:string){
  const [h,...rows]=text.trim().split(/\r?\n/)
  const headers=h.split(',').map(s=>s.trim())
  return rows.filter(Boolean).map(r=>{ const cols=r.split(','); const o:any={}; headers.forEach((k,i)=>o[k]=cols[i]?.trim() ?? ''); return normalize(o) })
}

export function parseSpreadsheet(buf:ArrayBuffer,name:string){
  if(name.endsWith('.csv')) return parseCsv(new TextDecoder().decode(buf))
  const wb=XLSX.read(buf); const ws=wb.Sheets[wb.SheetNames[0]]; return (XLSX.utils.sheet_to_json(ws) as any[]).map(normalize)
}

function normalize(r:any):ParsedLogRow{return {date:String(r.date||''),project_code:String(r.project_code||''),supplier_name:String(r.supplier_name||''),plant_code:String(r.plant_code||''),hours_worked:Number(r.hours_worked||0),idle_hours:Number(r.idle_hours||0),breakdown_hours:Number(r.breakdown_hours||0),description:String(r.description||'')}}
