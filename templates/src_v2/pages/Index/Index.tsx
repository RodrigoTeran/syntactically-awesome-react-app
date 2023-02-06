import React, { useState } from 'react'
import styles from './Index.module.css'
import Logo from '../../assets/img/logo.png'
import Button from '../../components/Button/Button'
import { ReactComponent as LinkSvg } from '../../assets/icons/link.svg'
import { SECRETS } from '../../config/constants'

const IndexPage: React.FunctionComponent = () => {
	const [randomSecret, setRandomSecret] = useState<string>('')

	const copy = (): void => {
		const secretsLength: number = SECRETS.length
		const randomIndex: number = Math.floor(Math.random() * secretsLength) - 1
		const secret: string = SECRETS[randomIndex === -1 ? 0 : randomIndex]

		setRandomSecret(secret)
	}

	return (
		<div className={`flex items-center justify-center flex-col gap-y-2 ${styles.index}`}>
			<img src={Logo} alt="Logo" />
			<p className="text-center">
				{randomSecret.trim() === '' && 'This is a very simple example of a SARA project!'}
				{randomSecret.trim() !== '' && randomSecret}
			</p>
			<div className="flex gap-3 items-center">
				<Button onClick={copy} className="rounded bg-slate-200 text-neutral-800 hover:bg-slate-100">
					secret!!!
				</Button>
				<Button className="rounded flex items-center gap-x-3" href="https://github.com/RodrigoTeran/syntactically-awesome-react-app">
					<span className="whitespace-nowrap">Go to docs</span>
					<LinkSvg className="fill-slate-100 w-3 h-3" />
				</Button>
			</div>
		</div>
	)
}

export default IndexPage
