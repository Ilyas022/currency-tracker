import React from 'react'
import { toast } from 'react-toastify'

import ChartItem from 'components/Chart'
import { ErrorBoundary } from 'components/ErrorBoundary'
import LoadingSpinner from 'components/LoadingSpinner'
import observable from 'components/Observable'
import Select from 'components/Select'
import { axiosInstanceHistory } from 'src/utils/axios'

import { TimelinePageMocks, config } from './config'
import { TimelinePageComp, TimelineContainer, TimelineSelects, TimelineTitle } from './styled'

class TimelinePage extends React.PureComponent<
	{},
	{ date: string; currency: string; data: []; isLoaded: boolean; isError: boolean }
> {
	constructor(props: {}) {
		super(props)
		this.state = { date: '1DAY', currency: 'BTC', data: [], isLoaded: false, isError: false }
		this.handleDateSelect = this.handleDateSelect.bind(this)
		this.handleCurrencySelect = this.handleCurrencySelect.bind(this)
		this.handleLoadedData = this.handleLoadedData.bind(this)
		this.getData = this.getData.bind(this)
	}

	componentDidMount(): void {
		observable.subscribe(this.handleLoadedData)
		this.getData()
	}

	componentDidUpdate(
		prevProps,
		prevState: { date: string; currency: string; data: []; isLoaded: boolean }
	) {
		const { currency, date } = this.state
		if (prevState.date !== date || prevState.currency !== currency) {
			this.getData()
		}
	}

	componentWillUnmount() {
		observable.unsubscribe(this.handleLoadedData)
	}

	handleLoadedData({ isLoaded, isError }: { isLoaded: boolean; isError?: boolean }) {
		const { toastConfig } = config
		this.setState({ isLoaded })

		if (isError) {
			this.setState({ isError })
			return toast.error('🦄 Something went wrong!', toastConfig)
		}
		return toast.success('🦄 Data is loaded!', toastConfig)
	}

	handleDateSelect(date: string) {
		this.setState({ date })
	}

	handleCurrencySelect(currency: string) {
		this.setState({ currency })
	}

	getData = async () => {
		const { currency, date } = this.state
		try {
			const res = await axiosInstanceHistory.get(
				`BITSTAMP_SPOT_${currency}_USD/history?period_id=${date}`
			)
			this.setState({ data: res.data })
			observable.notify({ isLoaded: true })
		} catch (error) {
			observable.notify({ isLoaded: false, isError: true })
		}
	}

	render() {
		const { date, currency, data, isLoaded, isError } = this.state
		const { currencyMocks, periodMocks } = TimelinePageMocks

		const dateDefaultValue = periodMocks.find((item) => item.value === date)
		const dateFilteredOptions = periodMocks.filter((item) => item.value !== date)

		const currencyDefaultValue = currencyMocks.find((item) => item.value === currency)
		const currencyFilteredOptions = currencyMocks.filter((item) => item.value !== currency)

		return (
			<TimelinePageComp>
				<ErrorBoundary
					fallback={<TimelineTitle>Smth went wrong, we&apos;re fixing this problem</TimelineTitle>}
				>
					<TimelineContainer>
						<TimelineSelects>
							<Select
								placeholder="Select date"
								options={dateFilteredOptions}
								handleSelect={this.handleDateSelect}
								defaultValue={dateDefaultValue}
							/>
							<Select
								placeholder="Select currency"
								options={currencyFilteredOptions}
								handleSelect={this.handleCurrencySelect}
								defaultValue={currencyDefaultValue}
							/>
						</TimelineSelects>

						{isLoaded && (
							<>
								<TimelineTitle $textalign="left">{currencyDefaultValue?.label}</TimelineTitle>
								<ChartItem optionsData={data} unit={dateDefaultValue?.unit || 'month'} />
							</>
						)}
						{!isLoaded && !isError && <LoadingSpinner />}
					</TimelineContainer>
				</ErrorBoundary>
				{isError && <TimelineTitle>Smth went wrong, we&apos;re fixing this problem</TimelineTitle>}
			</TimelinePageComp>
		)
	}
}

export default TimelinePage
