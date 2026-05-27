import { LogStatus } from './types'

export const logStatusLabel: Record<LogStatus, string> = {
  draft: 'Draft', submitted: 'Submitted', approved: 'Approved', rejected: 'Rejected', included_in_ipc: 'Included in IPC'
}

export function badgeClass(status: string){
  if (['approved','active','available','finalized'].includes(status)) return 'bg-emerald-100 text-emerald-800'
  if (['rejected','inactive'].includes(status)) return 'bg-rose-100 text-rose-800'
  if (['submitted','in_use'].includes(status)) return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-800'
}
