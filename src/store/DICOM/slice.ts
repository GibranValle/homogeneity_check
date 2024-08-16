'use client'

import { stats, EMPTY_IMAGE, EMPTY_INFO, type_image, type_info } from '@/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DICOMState = {
	image: type_image
	info: type_info
	imageId: string
	statistics: stats[]
	element: any
}

const initialState: DICOMState = {
	image: EMPTY_IMAGE,
	info: EMPTY_INFO,
	imageId: '',
	statistics: [],
	element: null,
}

const slice = createSlice({
	name: 'DICOM',
	initialState,
	reducers: {
		setImageId: (state, action: PayloadAction<string>) => {
			state.imageId = action.payload
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
		updateInfo: (state, action: PayloadAction<type_info>) => {
			state.info = action.payload
		},
	},
})

export const { updateImage, updateInfo, updateStatistics, setImageId, setElement } = slice.actions

export default slice.reducer
