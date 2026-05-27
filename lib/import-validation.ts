export type ImportRow={date:string;project_code:string;supplier_name:string;plant_code:string;hours_worked:number}
export function validateRow(r:ImportRow, refs:{projects:Set<string>,suppliers:Set<string>,plants:Set<string>}){
  const errors:string[]=[]
  if(!refs.projects.has(r.project_code)) errors.push('Missing project')
  if(!refs.suppliers.has(r.supplier_name)) errors.push('Missing supplier')
  if(!refs.plants.has(r.plant_code)) errors.push('Missing plant')
  if(r.hours_worked<=0) errors.push('Hours must be > 0')
  return {valid:errors.length===0,errors}
}
