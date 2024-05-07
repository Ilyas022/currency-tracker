import { useEffect, useState } from 'react'

import PopUp from 'components/PopUp'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectCurrency } from 'store/selectors'

import { ExchangeItem } from './styled'
import { CurrencyPopUpProps } from './types'
import CurrencySelect from '../CurrencySelect'

function CurrencyPopUp({ currency, handleClose }: CurrencyPopUpProps) {
	const { fetchCurrencyExchange } = useActions()
	const [selectedCurrency, setSelectedCurrency] = useState(currency)
	const { currencyExchangeList } = useTypedSelector(selectCurrency)

	const data = currencyExchangeList[selectedCurrency.code]

	useEffect(() => {
		if (!data) {
			fetchCurrencyExchange(selectedCurrency.code)
		}
	}, [selectedCurrency])

	const handleSelect = (curr: typeof selectedCurrency) => {
		setSelectedCurrency(curr)
	}

	return (
		<PopUp title="Сurrency exchange" handleClose={handleClose}>
			{data && (
				<>
					{data.map((item) => (
						<ExchangeItem key={item.code}>
							<p>
								{item.code} <span>to</span> {selectedCurrency.code}
							</p>
							<p>{item.value % 1 === 0 ? item.value : item.value.toFixed(4)}</p>
						</ExchangeItem>
					))}
					<CurrencySelect options={data} value={selectedCurrency} handleSelect={handleSelect} />
				</>
			)}
		</PopUp>
	)
}

export default CurrencyPopUp