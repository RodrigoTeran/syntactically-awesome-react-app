import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTE_HOME } from './config/routes'
import LandingLayout from './layouts/Landing/LandingLayout'
import IndexPage from './pages/Index/Index'

const App: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTE_HOME} element={<LandingLayout />}>
					<Route path={ROUTE_HOME} element={<IndexPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
