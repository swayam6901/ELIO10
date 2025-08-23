interface Props { checked: boolean; onChange: (v: boolean) => void; label?: string }
export default function Switch({ checked, onChange, label }: Props) {
return (
<label className="flex items-center gap-2 cursor-pointer select-none">
<span className="text-sm opacity-80">{label}</span>
<span
onClick={() => onChange(!checked)}
className={`h-6 w-11 rounded-full p-1 transition-colors ${checked ? 'bg-brand' : 'bg-neutral-300 dark:bg-neutral-700'}`}
>
<span className={`block h-4 w-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`}></span>
</span>
</label>
)
}
