import { expect,it } from 'vitest';
import { canApprove } from '@/lib/roles';
it('role approval',()=>{expect(canApprove('manager')).toBe(true);expect(canApprove('viewer')).toBe(false)})
