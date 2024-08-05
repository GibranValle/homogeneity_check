export const readFile = (file: File) => {
	return new Promise<string>((resolve) => {
		const reader = new FileReader()
		reader.addEventListener('load', async () => {
			const buffer = reader.result as string
			resolve(buffer!)
		})
		reader.readAsDataURL(file)
	})
}



export const calculateHU = (pixelValue: number, rescaleSlope: number, rescaleIntercept: number) => pixelValue * rescaleSlope + rescaleIntercept

export const applyWindowLevel = (pixelValue: number, windowCenter: number, windowWidth: number) => {
	let minValue = windowCenter - windowWidth / 2
	let maxValue = windowCenter + windowWidth / 2
	return Math.min(Math.max(pixelValue, minValue), maxValue)
}

export const calculateRoiStatistics = (imageData: Uint8Array, roi: any, imageWidth: number): { area: number; mean: number; stdDev: number } => {
	const { start, end } = roi.handles
	const xStart = Math.round(start.x)
	const yStart = Math.round(start.y)
	const xEnd = Math.round(end.x)
	const yEnd = Math.round(end.y)

	let sum = 0
	let sumOfSquares = 0
	let count = 0

	for (let y = yStart; y <= yEnd; y++) {
		for (let x = xStart; x <= xEnd; x++) {
			const index = y * imageWidth + x
			const value = imageData[index]

			if (value !== undefined) {
				sum += value
				sumOfSquares += value * value
				count++
			}
		}
	}

	const area = count
	const mean = sum / count
	const variance = sumOfSquares / count - mean * mean
	const stdDev = Math.sqrt(variance)

	return { area, mean, stdDev }
}
