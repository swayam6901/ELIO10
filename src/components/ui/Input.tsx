import { InputHTMLAttributes } from 'react'
export default function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
return (
<input
{...props}
className={'w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl px-3 py-2 bg-white dark:bg-neutral-900 ' + className}
/>
)
}
