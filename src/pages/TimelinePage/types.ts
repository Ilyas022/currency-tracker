import { fetchHistory } from 'store/thunks/historyThunks'

export interface TimelinePageProps {
	data: {
		[key: string]: {
			time_open: string
			price_open: number
			price_high: number
			price_low: number
			price_close: number
		}[]
	}
	status: string
	fetchHistory: typeof fetchHistory
}

export interface TimelinePageState {
	isPopUpOpened: boolean
	date: { label: string; value: string }
	currency: { label: string; value: string }
	isLoaded: boolean
	isError: boolean
	isChartCustom: boolean
	customData: {
		time_open: string
		price_open: number
		price_high: number
		price_low: number
		price_close: number
	}[]
}
