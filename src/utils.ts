export const svgCreate = (name: string) =>
	document.createElementNS('http://www.w3.org/2000/svg', name)

export const num = (e: HTMLInputElement) => e.valueAsNumber

export function inputValue(e: HTMLInputElement, v: number) {
	const min = Number(e.min)
	const max = Number(e.max)
	const value = Math.max(min, Math.min(max, v))
	if (e.valueAsNumber !== value) e.valueAsNumber = value
}

export const debounce = <T extends any[], U>(fn: (...args: T) => U, ms: number) => {
	let timer: number | undefined
	return (...args: T) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
			timer = undefined
		}, ms)
	}
}
