import { ButtonHTMLAttributes } from 'react'
export default function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
return (
<button
{...props}
className={
'px-4 py-2 rounded-2xl bg-brand text-white shadow hover:bg-brand-dark disabled:opacity-50 ' +
className
}
/>
)
}
