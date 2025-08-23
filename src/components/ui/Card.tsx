import { ReactNode } from 'react'
export function Card({ children }: { children: ReactNode }) {
return <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 bg-white dark:bg-neutral-900 shadow-sm">{children}</div>
}
export function CardTitle({ children }: { children: ReactNode }) {
return <h3 className="text-lg font-semibold mb-2">{children}</h3>
}
