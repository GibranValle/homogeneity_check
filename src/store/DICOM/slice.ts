import { type_editor } from '@/interfaces/Editor'
import { EMPTY_IMAGE, EMPTY_INFO, type_image, type_info } from '@/interfaces/Uploader'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DICOMState = {
	image: type_image
	info: type_info
	updater: any
	isLoading: boolean
	imageId: string
}

const initialState: DICOMState = {
	image: EMPTY_IMAGE,
	info: EMPTY_INFO,
	updater: null,
	isLoading: false,
	imageId: '',
}

const slice = createSlice({
	name: 'DICOM',
	initialState,
	reducers: {
		toggleIsLoading: (state) => {
			state.isLoading = !state.isLoading
		},
		setImageId: (state, action: PayloadAction<string>) => {
			state.imageId = action.payload
		},
		setUpdater: (state, action: PayloadAction<any>) => {
			state.updater = action.payload.updateViewport
		},
		updateImage: (state, action: PayloadAction<type_image>) => {
			state.image = action.payload
		},
		updateInfo: (state, action: PayloadAction<type_info>) => {
			state.info = action.payload
		},
		updateViewport: (state, action: PayloadAction<type_editor>) => {
			const { windowCenter, windowWidth } = action.payload
			state.updater(windowCenter, windowWidth)
		},
	},
})

export const { toggleIsLoading, updateImage, updateInfo, updateViewport, setUpdater, setImageId } = slice.actions

export default slice.reducer
