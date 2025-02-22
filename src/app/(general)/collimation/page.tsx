'use client'
import dynamic from 'next/dynamic'
const Collimation = dynamic(() => import('@/components/Root/Collimation'), { ssr: false })

export default function Home() {
	return <Collimation />
}
