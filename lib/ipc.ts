export type PreviewInput={id:string;hours_worked:number;rate?:number;date:string;plant:string}
export function calculateIpcPreview(logs:PreviewInput[]){
  const lines=logs.map(l=>({id:l.id,plant:l.plant,date:l.date,hours:l.hours_worked,rate:l.rate??0,amount:l.rate?l.rate*l.hours_worked:0,warning:l.rate?null:'Missing rate'}))
  const warnings=lines.filter(l=>l.warning).map(l=>`${l.plant}: ${l.warning}`)
  return {lines,total:lines.reduce((a,b)=>a+b.amount,0),warnings}
}
export function finalizeIpcPayload(project_id:string,supplier_id:string,start_date:string,end_date:string){return {project_id,supplier_id,start_date,end_date}}
