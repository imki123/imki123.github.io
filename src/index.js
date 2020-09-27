import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
	hydrate(
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>,
		rootElement,
	)
} else {
	ReactDOM.render(
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>,
		document.getElementById('root'),
	)
}
