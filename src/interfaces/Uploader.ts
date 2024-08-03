export type type_info = {
	KV: string
	sensitivity: string
	date: string
	filter: string
	mode: string
	serialNumber: string
	pixelSpacing: string
	version: string
	exposure: string
	grid: string
	anode: string
	thickness: string
	force: string
	paddle: string
	menu: string
	presentation: string
	modality: string
	institution: string
	station: string
	patientName: string
	imageWidth: number
	imageHeight: number
}

export const EMPTY_INFO: type_info = {
	KV: '',
	serialNumber: '',
	version: '',
	exposure: '',
	grid: '',
	anode: '',
	thickness: '',
	force: '',
	paddle: '',
	menu: '',
	presentation: '',
	modality: '',
	institution: '',
	station: '',
	patientName: '',
	sensitivity: '',
	date: '',
	filter: '',
	mode: '',
	pixelSpacing: '0.05\\0.05',
	imageWidth: 0,
	imageHeight: 0,
}

export type type_image = {
	name: string
	imageWidth: number
	imageHeight: number
	pixelData: Uint16Array
	slope: number
	intercept: number
	windowCenter: number
	windowWidth: number
	file?: File
}

export const EMPTY_IMAGE: type_image = {
	name: 'NA',
	imageWidth: 472,
	imageHeight: 592,
	pixelData: new Uint16Array(),
	slope: 1,
	intercept: 0,
	windowCenter: 2048,
	windowWidth: 4096,
}
