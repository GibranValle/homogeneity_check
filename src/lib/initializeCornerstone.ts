// src/cornerstoneConfig.ts
import cornerstone from 'cornerstone-core'
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools'
import dicomParser from 'dicom-parser'
import Hammer from 'hammerjs'
//@ts-ignore
import * as cornerstoneMath from 'cornerstone-math'
//@ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'

export const initializeCornerstone = () => {
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone
	cornerstoneWADOImageLoader.external.dicomParser = dicomParser
	cornerstoneWADOImageLoader.configure({
		useWebWorkers: true,
		decodeConfig: {
			convertFloatPixelDataToInt: false,
		},
		maxWebWorkers: navigator.hardwareConcurrency || 1,
		startWebWorkersOnDemand: true,
		webWorkerPath: 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.js',
		taskConfiguration: {
			decodeTask: {
				codecsPath: 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js',
			},
		},
	})
	//tools
	cornerstoneTools.external.cornerstone = cornerstone
	cornerstoneTools.external.dicomParser = dicomParser
	cornerstoneTools.external.Hammer = Hammer
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath
	// Initialize tools
	cornerstoneTools.init({
		showSVGCursors: true,
	})

	// 	// Add tools
	// 	cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool)
	// 	cornerstoneTools.addTool(cornerstoneTools.PanTool)

	// 	// Set tools active with mouseButtonMask
	// 	cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 }) // Botón izquierdo
	// 	cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 4 }) // Botón derecho
}

export function loadAndViewImageBlob(blob: Blob) {
	const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(blob)
	return imageId
}

export async function loadAndViewImageFile(file: File) {
	const readFileArrayBuffer = (file: File) => {
		return new Promise<ArrayBuffer>((resolve) => {
			const reader = new FileReader()
			reader.addEventListener('load', async () => {
				const buffer = reader.result as ArrayBuffer
				resolve(buffer)
			})
			reader.readAsArrayBuffer(file)
		})
	}
	const arrayBuffer = await readFileArrayBuffer(file)
	const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'application/dicom' })
	const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(blob)
	console.log(imageId)
	return imageId
}
