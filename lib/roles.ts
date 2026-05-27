const map={owner:5,admin:4,manager:3,site_clerk:2,supplier:1,viewer:0} as const
export type Role=keyof typeof map
export const canApprove=(r:Role)=>map[r]>=3
