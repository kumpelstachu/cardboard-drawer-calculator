import { svgCreate } from './utils'

export function createBox(size: { x: number; y: number; z: number }, scale = 1) {
	const thickness = 5 * scale
	size.x *= scale
	size.y *= scale
	size.z *= scale

	const width = size.x + size.y * 2 + thickness * 2
	const height = size.z + size.y * 2 + thickness
	const svg = svgCreate('svg')
	svg.setAttribute('width', `${width}mm`)
	svg.setAttribute('height', `${height}mm`)
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

	svg.append(
		// left side
		createRect({
			x: 0,
			y: size.y,
			width: size.y,
			height: size.z,
		}),
		createRect({
			x: size.y,
			y: size.y,
			width: thickness,
			height: size.z,
		}),

		// right side
		createRect({
			x: size.x + size.y + thickness * 2,
			y: size.y,
			width: size.y,
			height: size.z,
		}),
		createRect({
			x: size.x + size.y + thickness,
			y: size.y,
			width: thickness,
			height: size.z,
		}),

		// top side
		createRect({
			x: size.y + thickness,
			y: 0,
			width: size.x,
			height: size.y,
		}),

		// bottom side
		createRect({
			x: size.y - thickness * 2,
			y: size.y + size.z,
			width: size.x + thickness * 6,
			height: size.y + thickness,
		}),

		// center
		createRect({
			x: size.y + thickness,
			y: size.y,
			width: size.x,
			height: size.z,
		})
	)

	return svg
}

function createRect(options: { x: number; y: number; width: number; height: number }) {
	const rect = svgCreate('rect')
	rect.setAttribute('x', `${options.x}`)
	rect.setAttribute('y', `${options.y}`)
	rect.setAttribute('width', `${options.width}`)
	rect.setAttribute('height', `${options.height}`)
	return rect
}
