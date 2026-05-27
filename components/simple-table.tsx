export function SimpleTable({title,headers,rows}:{title:string,headers:string[],rows:(string|number)[][]}){
  return <div className='card'><h2 className='font-semibold mb-3'>{title}</h2><table className='w-full text-sm'><thead><tr>{headers.map(h=><th key={h} className='text-left border-b py-2'>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} className='py-2 border-b'>{c}</td>)}</tr>)}</tbody></table></div>
}
