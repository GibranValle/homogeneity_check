export interface stats {
	color?: string
	id: string
	mean: number
	stdDev: number
}

export interface linealStats {
	roi: number | string
	id: string
	vmp: number
	dtp: number
	color?: string
}

export interface results {
	roi: number | string
	id: string
	vmp: number
	dtp: number
	rsr: number
	stdDevRSR: number
	threshold: string
	color?: string
}
