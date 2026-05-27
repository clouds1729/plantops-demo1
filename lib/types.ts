export type EntityStatus = 'active' | 'inactive'
export type ProjectStatus = 'active' | 'completed' | 'on_hold'
export type PlantStatus = 'available' | 'in_use' | 'maintenance'
export type LogStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'included_in_ipc'
export type TeamRole = 'owner' | 'admin' | 'manager' | 'site_clerk' | 'supplier' | 'viewer'

export type Project = { id:string; name:string; code:string; location:string; status:ProjectStatus; start_date:string; end_date?:string }
export type Supplier = { id:string; name:string; contact_email:string; phone:string; address:string; status:EntityStatus }
export type Plant = { id:string; name:string; plant_code:string; category:string; supplier_id:string; unit_type:string; status:PlantStatus }
export type Rate = { id:string; supplier_id:string; plant_id:string; project_id?:string; rate_type:'hourly'; hourly_rate:number; daily_rate?:number; overtime_rate?:number; currency:string; effective_from:string; effective_to?:string }
export type DailyLog = { id:string; date:string; project_id:string; supplier_id:string; plant_id:string; hours_worked:number; idle_hours:number; breakdown_hours:number; description:string; status:LogStatus; rejection_comment?:string }
export type ApprovalEvent = { id:string; log_id:string; action:'approved'|'rejected'; comment?:string; at:string }
export type IpcLine = { id:string; log_id:string; date:string; plant_id:string; hours:number; rate:number; amount:number }
export type Ipc = { id:string; number:string; project_id:string; supplier_id:string; start_date:string; end_date:string; status:'finalized'; subtotal:number; total:number; line_ids:string[] }
export type TeamMember = { id:string; name:string; email:string; role:TeamRole; supplier_id?:string }

export type DemoStore = { projects:Project[]; suppliers:Supplier[]; plants:Plant[]; rates:Rate[]; logs:DailyLog[]; approvals:ApprovalEvent[]; ipcs:Ipc[]; ipcLines:IpcLine[]; team:TeamMember[] }
