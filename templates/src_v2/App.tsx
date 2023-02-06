import React from 'react'

import SaraLogo from './assets/img/logo.png'

const App: React.FunctionComponent = () => {
	return (
		<div className="w-screen h-screen bg-slate-100 flex justify-center items-center flex-col gap-y-11">
			<div className="flex flex-col gap-y-4">
				<h1 data-cy="title" className="text-6xl text-slate-600 font-medium text-center px-4">Syntactically Awesome <br /> React App 🚀</h1>
				<p className="flex flex-col items-center gap-y-4">
					<span className="rounded bg-slate-300 hover:bg-slate-400 cursor-default transition-colors text-slate-900 px-4 py-1">$ Hello world!</span>
				</p>
			</div>
			<img className="w-48" src={SaraLogo} alt="SARA" />
		</div>
	)
}

export default App
