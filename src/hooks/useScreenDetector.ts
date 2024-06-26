import { useEffect, useState } from 'react'

export const useScreenDetector = () => {
	const [width, setWidth] = useState(window.innerWidth)

	const laptopResolution = 768
	const pcResolution = 1024

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const isMobile = width <= laptopResolution
	const isTablet = width <= pcResolution
	const isDesktop = width > pcResolution

	return { isMobile, isTablet, isDesktop }
}
