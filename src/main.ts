import './style.css'
import { createBox } from './box'
import { debounce, inputValue, num } from './utils'

const output = document.querySelector('output')!
const x = document.querySelector<HTMLInputElement>('input#x')!
const y = document.querySelector<HTMLInputElement>('input#y')!
const z = document.querySelector<HTMLInputElement>('input#z')!

const changeHash = debounce((hash: string) => location.hash !== hash && (location.href = hash), 500)

window.addEventListener('hashchange', hashChange)
;[x, y, z].forEach(e => e.addEventListener('input', recreateBox))
hashChange()
recreateBox()

function recreateBox() {
	const width = num(x)
	const height = num(y)
	const depth = num(z)

	x.previousElementSibling!.textContent = `x: ${width}`
	y.previousElementSibling!.textContent = `y: ${height}`
	z.previousElementSibling!.textContent = `z: ${depth}`

	const svg = createBox({
		x: width,
		y: height,
		z: depth,
	})
	svg.addEventListener('click', () => window.print())

	const info = document.createElement('p')
	const svgWidth = Number.parseInt(svg.getAttribute('width')!)
	const svgHeight = Number.parseInt(svg.getAttribute('height')!)
	info.textContent = `(total) width: ${svgWidth}; height: ${svgHeight}`
	info.classList.add('noprint')

	const text = document.createElement('span')
	text.textContent = `width: ${width}; height: ${height}; depth: ${depth}`

	const container = document.createElement('div')
	container.append(svg, text)

	output.innerHTML = ''
	output.append(info, container)

	changeHash(`#${[width, height, depth]}`)
}

function hashChange() {
	const [width, height, depth] = location.hash.slice(1).split(',').map(Number)
	if (isNaN(width) || isNaN(height) || isNaN(depth)) return
	inputValue(x, width)
	inputValue(y, height)
	inputValue(z, depth)
	recreateBox()
}
