'use client'
import { type_editor } from '@/interfaces/Editor'
import { EMPTY_IMAGE, EMPTY_INFO, type_image, type_info } from '@/interfaces/Uploader'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cornerstone from 'cornerstone-core'

type DICOMState = {
	image: type_image
	info: type_info
	imageId: string
	statistics: any
	element: any
	calcFinished: boolean
	calcStarted: boolean
}

const initialState: DICOMState = {
	image: EMPTY_IMAGE,
	info: EMPTY_INFO,
	imageId: '',
	statistics: null,
	element: null,
	calcFinished: false,
	calcStarted: false,
}

const slice = createSlice({
	name: 'DICOM',
	initialState,
	reducers: {
		setImageId: (state, action: PayloadAction<string>) => {
			state.imageId = action.payload
		},
		setCalcFinished: (state) => {
			state.calcFinished = true
		},
		setCalcStarted: (state) => {
			state.calcStarted = true
		},
		setElement: (state, action: PayloadAction<any>) => {
			state.element = action.payload
		},
		updateImage: (state, action: PayloadAction<type_image>) => {
			state.image = action.payload
		},
		updateInfo: (state, action: PayloadAction<type_info>) => {
			state.info = action.payload
		},
		updateViewport: (state, action: PayloadAction<type_editor>) => {
			let viewport = cornerstone.getViewport(state.element)
			if (!viewport) return
			const { windowCenter, windowWidth } = action.payload
			viewport.voi.windowWidth = windowWidth
			viewport.voi.windowCenter = windowCenter
			cornerstone.setViewport(state.element, viewport)
		},
	},
})

export const { updateImage, updateInfo, updateViewport, setImageId, setElement, setCalcFinished, setCalcStarted } = slice.actions

export default slice.reducer
