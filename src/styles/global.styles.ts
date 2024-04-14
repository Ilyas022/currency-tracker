import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*{
		padding: 0;
		margin: 0;
		border: 0;
	}
	*,*:before,*:after{
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	:focus,:active{outline: none;}
	a:focus,a:active{outline: none;}

	nav,footer,header,aside,main{display: block;}

	html {
		font-size: 62.5%;
		font-family: "Poppins", sans-serif;
	}

	html,body,#root{
		height: 100%;
		line-height: 1;
		-ms-text-size-adjust: 100%;
		-moz-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}
	input,button,textarea{font-family:inherit;}
	input::-ms-clear{display: none;}
	button{cursor: pointer; background-color: transparent;}
	button::-moz-focus-inner {padding:0;border:0;}
	a, a:visited{text-decoration: none;}
	a:hover{text-decoration: none;}
	ul li{list-style: none;}
	img{vertical-align: top;}

	h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: inherit;}

	*a, *button {
		color: inherit;
	}

	body {
			background-color: ${({ theme }) => theme.colors.primary};
			color: #fff;
	}

	#root {

		> main {
			flex: 1 0 auto;
		}

		> footer {
			flex: 0 0 auto;
		}
	}
`
