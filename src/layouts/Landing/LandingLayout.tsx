import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'

const LandingLayout: React.FunctionComponent = () => {
	return (
		<div className="flex flex-col w-screen">
			<Nav />
			<Outlet />
		</div>
	)
}
export default LandingLayout
