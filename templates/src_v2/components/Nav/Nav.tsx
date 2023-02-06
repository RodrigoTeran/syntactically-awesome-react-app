import React from 'react'
import Button from '../Button/Button'
import { ReactComponent as LinkSvg } from '../../assets/icons/link.svg'

const Nav: React.FunctionComponent = () => {
	return (
		<nav className="sticky top-0 left-0 w-screen h-20 flex px-10 items-center justify-between">
			<div data-cy="title" className="text-indigo-600 text-xl font-bold">SARA</div>
			<div className="flex gap-x-3 items-center justify-between">
				<Button className="py-1 bg-slate-200 text-neutral-800 hover:bg-slate-100">Just a btn</Button>
				<Button
					href="https://github.com/RodrigoTeran/syntactically-awesome-react-app"
					className="py-1 flex items-center gap-x-3"
				>
					<span className="whitespace-nowrap">Repo</span>
					<LinkSvg className="fill-slate-100 w-3 h-3" />
				</Button>
			</div>
		</nav>
	)
}

export default Nav
