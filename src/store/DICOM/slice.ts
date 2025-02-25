'use client'

import { stats, EMPTY_IMAGE, EMPTY_INFO, type_image, type_info } from '@/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type type_inner_roi = {
	startX: number
	startY: number
	endX: number
	endY: number
}

type DICOMState = {
	image: type_image
	info: type_info
	imageId: string
	statistics: stats[]
	element: any
	inner_roi: type_inner_roi | null
	collimatorImage: type_image
	collimatorImageId: string
}

const initialState: DICOMState = {
	image: EMPTY_IMAGE,
	info: EMPTY_INFO,
	imageId: '',
	statistics: [],
	element: null,
	inner_roi: null,
	collimatorImage: EMPTY_IMAGE,
	collimatorImageId: '',
}

const slice = createSlice({
	name: 'DICOM',
	initialState,
	reducers: {
		setImageId: (state, action: PayloadAction<string>) => {
			state.imageId = action.payload
		},
		setCollimatorImageId: (state, action: PayloadAction<string>) => {
			state.collimatorImageId = action.payload
		},
		setElement: (state, action: PayloadAction<any>) => {
			state.element = action.payload
		},
		updateStatistics: (state, action: PayloadAction<any[]>) => {
			state.statistics = action.payload
		},
		updateImage: (state, action: PayloadAction<type_image>) => {
			state.image = action.payload
		},
		updateCollimationImage: (state, action: PayloadAction<type_image>) => {
			state.collimatorImage = action.payload
		},
		updateInfo: (state, action: PayloadAction<type_info>) => {
			state.info = action.payload
		},
		setInnerRoi: (state, action: PayloadAction<type_inner_roi>) => {
			state.inner_roi = action.payload
		},
	},
})

export const { updateImage, updateCollimationImage, updateInfo, updateStatistics, setImageId, setElement, setInnerRoi, setCollimatorImageId } =
	slice.actions

export default slice.reducer
