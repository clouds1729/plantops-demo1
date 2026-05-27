import { QuickForm } from '@/components/quick-form'
import { SimpleTable } from '@/components/simple-table'
export default function Page(){return <div className='space-y-4'><h1 className='text-2xl font-bold capitalize'>imports</h1><QuickForm title='Create imports record' fields={['name','code','status']}/><SimpleTable title='imports list' headers={['Name','Status']} rows={[["Sample","active"],["Demo","draft"]]}/></div>}
