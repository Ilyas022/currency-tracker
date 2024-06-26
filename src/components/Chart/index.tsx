/* eslint-disable camelcase */

import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	TimeScale,
} from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import React from 'react'
import { Chart as ChartItem } from 'react-chartjs-2'

import 'chartjs-adapter-date-fns'
import { chartData, options, plugins } from './config'
import { ChartContainer } from './styled'
import { ChartItemProps } from './types'

ChartJS.register(CategoryScale, LinearScale, BarElement, TimeScale, Tooltip, Legend, zoomPlugin)

class Chart extends React.PureComponent<ChartItemProps> {
	render() {
		const { optionsData, unit } = this.props

		const chartItems = optionsData.map(
			({ price_close, price_open, price_low, price_high, time_open }) => ({
				x: Date.parse(time_open),
				o: price_open,
				h: price_high,
				l: price_low,
				c: price_close,
				s: [price_open, price_close],
			})
		)

		return (
			<ChartContainer>
				<ChartItem
					type="bar"
					plugins={plugins}
					data={chartData(chartItems)}
					options={options(unit, chartItems[chartItems.length - 1].x, chartItems[0].x)}
				/>
			</ChartContainer>
		)
	}
}

export default Chart
