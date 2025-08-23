export const track = (event: string, props?: Record<string, any>) => {
if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line no-console
console.log(`[track] ${event}`, props)
}
}
