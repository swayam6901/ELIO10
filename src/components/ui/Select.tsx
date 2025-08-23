import { SelectHTMLAttributes } from 'react'
export default function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
return (
<select
{...props}
className={'border border-neutral-300 dark:border-neutral-700 rounded-2xl px-3 py-2 bg-white dark:bg-neutral-900 ' + className}
/>
)
}
