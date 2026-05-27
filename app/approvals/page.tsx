import { QuickForm } from '@/components/quick-form'
import { SimpleTable } from '@/components/simple-table'
export default function Page(){return <div className='space-y-4'><h1 className='text-2xl font-bold capitalize'>approvals</h1><QuickForm title='Create approvals record' fields={['name','code','status']}/><SimpleTable title='approvals list' headers={['Name','Status']} rows={[["Sample","active"],["Demo","draft"]]}/></div>}
