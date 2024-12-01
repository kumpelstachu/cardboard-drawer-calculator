import { svgCreate } from './utils'

export function createBox(
	size: { x: number; y: number; z: number; thickness?: number },
	scale = 1
) {
	const thickness = (size.thickness ?? 5) * scale
	size.x *= scale
	size.y *= scale
	size.z *= scale

	const width = size.x + size.y * 2 + thickness * 2
	const height = size.z + size.y * 2 + thickness * 3
	const svg = svgCreate('svg')
	svg.setAttribute('width', `${width}mm`)
	svg.setAttribute('height', `${height}mm`)
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

	svg.append(
		// left side
		createRect({
			x: 0,
			y: size.y + thickness,
			width: size.y,
			height: size.z,
		}),
		createRect({
			x: size.y,
			y: size.y + thickness,
			width: thickness,
			height: size.z,
		}),

		// right side
		createRect({
			x: size.x + size.y + thickness * 2,
			y: size.y + thickness,
			width: size.y,
			height: size.z,
		}),
		createRect({
			x: size.x + size.y + thickness,
			y: size.y + thickness,
			width: thickness,
			height: size.z,
		}),

		// top side
		createRect({
			x: size.y,
			y: 0,
			width: size.x + thickness * 2,
			height: size.y,
		}),
		createRect({
			x: size.y,
			y: size.y,
			width: size.x + thickness * 2,
			height: thickness,
		}),

		// bottom side
		createRect({
			x: size.y - thickness,
			y: size.y + size.z + thickness * 2,
			width: size.x + thickness * 4,
			height: size.y + thickness,
		}),
		createRect({
			x: size.y - thickness,
			y: size.y + size.z + thickness,
			width: size.x + thickness * 4,
			height: thickness,
		}),

		// center
		createRect({
			x: size.y + thickness,
			y: size.y + thickness,
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
	rect.setAttribute('stroke-width', '0.3')
	rect.setAttribute('stroke', 'black')
	rect.setAttribute('fill', 'none')
	return rect
}
