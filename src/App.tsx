import React from 'react'

import SaraLogo from './assets/img/logo.png'

const App: React.FunctionComponent = () => {
	return (
		<div className="w-screen h-screen bg-slate-50 flex justify-center items-center flex-col gap-y-11">
			<div className="flex flex-col gap-y-4">
				<h1 className="text-6xl text-slate-600 font-medium text-center px-4">Syntactically Awesome React App</h1>
				<p className="flex flex-col items-center gap-y-4">
					<span className="rounded bg-slate-400 text-slate-900 px-4 py-1">$ Hello world!</span>
				</p>
			</div>
			<img className="w-60" src={SaraLogo} alt="SARA" />
		</div>
	)
}

export default App
