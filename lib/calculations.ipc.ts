import { DailyLog, Plant, Rate } from './types'

export function calculateIpc(logs: DailyLog[], rates: Rate[], plants: Plant[]) {
  const lines = logs.map((l) => {
    const rate = rates.find((r) => r.plant_id === l.plant_id && (!r.project_id || r.project_id === l.project_id))
    if (!rate) return { log_id: l.id, missingRate: true, amount: 0, date: l.date, plant: plants.find(p=>p.id===l.plant_id)?.name ?? 'Unknown', hours: l.hours_worked, rate: 0 }
    return { log_id: l.id, missingRate: false, amount: l.hours_worked * rate.hourly_rate, date: l.date, plant: plants.find(p=>p.id===l.plant_id)?.name ?? 'Unknown', hours: l.hours_worked, rate: rate.hourly_rate }
  })
  const warnings = lines.filter(l=>l.missingRate).map(l=>`Missing rate for ${l.plant} on ${l.date}`)
  const subtotal = lines.reduce((a,b)=>a+b.amount,0)
  return { lines, warnings, subtotal, tax: 0, total: subtotal }
}
