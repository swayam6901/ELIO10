import './globals.css'
import { ReactNode } from 'react'


export const metadata = {
title: 'ELI10 Explainer',
description: 'Explain any topic at multiple levels with an optional mindmap.',
}


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en" suppressHydrationWarning>
<body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
<div className="max-w-4xl mx-auto px-4 py-8">
{children}
</div>
</body>
</html>
)
}
