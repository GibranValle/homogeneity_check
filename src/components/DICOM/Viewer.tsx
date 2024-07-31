"use client"
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { type_image } from '@/interfaces/Uploader';

type Props = {
    image: type_image
    cornerstone: any
    setViewPort: any
    setElement: any
    updateViewPort: (width: number, center: number) => void
}

const MAX = Math.pow(2, 16)
const width = 4728;
const height = 5928;
const numPixels = width * height;
const pixelData = new Uint16Array(numPixels);
let index = 0;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        pixelData[index] = Math.random() * MAX;
        index++;
    }
}

const Viewer: FC<Props> = ({ image, cornerstone, setViewPort, setElement, updateViewPort }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [cornerstoneImage, setCornerStoneImage] = useState<any>(null)

    // RENDER TEST IMAGE
    useEffect(() => {
        const getPixelData = () => pixelData
        setCornerStoneImage({
            imageId: 'testImage',
            minPixelValue: 0,
            maxPixelValue: MAX,
            slope: 0.1,
            intercept: 0,
            windowCenter: Math.pow(2, 11),
            windowWidth: Math.pow(2, 12),
            render: cornerstone.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: 1.0,
            rowPixelSpacing: 1.0,
            invert: false,
            sizeInBytes: numPixels * 2
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // RENDER LOADED IMAGE
    useEffect(() => {
        if (image) {
            const { imageHeight, imageWidth, pixelData, name, slope, intercept, windowCenter, windowWidth } = image
            if (name === 'NA') return
            const width = imageWidth;
            const height = imageHeight;

            const numPixels = width * height;
            const getPixelData = () => pixelData
            const newImage = {
                imageId: 'UploadedImage',
                minPixelValue: 0,
                maxPixelValue: MAX,
                slope,
                intercept,
                windowCenter,
                windowWidth,
                render: cornerstone.renderGrayscaleImage,
                getPixelData: getPixelData,
                rows: height,
                columns: width,
                height: height,
                width: width,
                color: false,
                columnPixelSpacing: 1.0,
                rowPixelSpacing: 1.0,
                invert: false,
                sizeInBytes: numPixels * 2
            };
            console.log(newImage)
            setCornerStoneImage(newImage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    useEffect(() => {
        const element = elementRef.current;
        if (element && cornerstoneImage) {
            cornerstone.enable(element);
            cornerstone.displayImage(element, cornerstoneImage);
            const viewport = cornerstone.getViewport(element);
            if (viewport) {
                setElement(element)
                setViewPort(viewport)
            }
        }
        return () => {
            cornerstone.disable(element!);
        };

    }, [cornerstone, cornerstoneImage, setElement, setViewPort])

    return (
        <div ref={elementRef} id="dicomImage" style={{ width: '100%', height: '100%' }}>
        </div>
    );
}

export default Viewer