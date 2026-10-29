// Tiny event bus so any component can open the project drawer or show a toast without prop drilling.
export const openProject = (id: string) => window.dispatchEvent(new CustomEvent('open-project', { detail: id }))
export const say = (message: string) => window.dispatchEvent(new CustomEvent('toast', { detail: message }))

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
