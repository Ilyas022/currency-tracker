import styled from 'styled-components'

import { device } from 'constants/breakpoints'

const smallScreenEnd = '1024px'

export const ContactsContainer = styled.div`
	display: flex;
	max-width: 1280px;
	padding: 20px;
	margin: 0 auto;
	width: 100%;

	@media ${device.md} {
		flex-direction: column-reverse;
		gap: 40px;
	}

	& > * {
		flex-basis: 50%;
		padding: 40px;

		@media ${device.md} {
			padding: 20px;
		}
	}
`

export const ContactsInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
	background-color: #2d2d2d;
	font-size: 16px;

	@media ${device.md} {
		gap: 20px;
	}
`

export const ContactsInfoItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	font-size: 24px;

	@media (max-width: ${smallScreenEnd}) {
		font-size: 20px;
	}
	@media ${device.md} {
		gap: 10px;
	}

	& > p {
		padding-left: 34px;
		font-size: 20px;
		line-height: 150%;

		@media (max-width: ${smallScreenEnd}) {
			font-size: 16px;
			padding-left: 30px;
		}
	}

	& > div {
		display: flex;
		gap: 10px;
	}
`

export const ContactsForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	background: linear-gradient(225deg, #2c5d2c 0%, #2c5d2c 50%, black 100%);

	@media ${device.md} {
		gap: 10px;
	}

	& > h2 {
		font-size: 38px;
		text-transform: uppercase;
		text-align: center;

		@media (max-width: ${smallScreenEnd}) {
			font-size: 30px;
		}

		@media ${device.md} {
			font-size: 24px;
			margin-bottom: 20px;
		}
	}

	& input,
	textarea {
		width: 100%;
		padding: 10px;
		font-size: 14px;
	}

	& textarea {
		resize: none;
		height: 150px;
	}
`

export const FormItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-bottom: 20px;
	position: relative;
	& > p {
		color: red;
		font-size: 14px;
		position: absolute;
		bottom: 0px;
	}
`

export const ContactsBtn = styled.button`
	background-color: #3c9e20;
	padding: 15px;
	text-align: center;
	font-size: 16px;
	color: white;
	border-radius: 8px;
`
