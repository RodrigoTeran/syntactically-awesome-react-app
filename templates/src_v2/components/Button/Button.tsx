import React from 'react'
import { Link } from 'react-router-dom'
import type { Props } from './Button.types'

const Button: React.FunctionComponent<Props> = ({
	children,
	className = '',
	onClick = null,
	href = null,
	isReactiveHref = false,
}) => {
	if (href !== null && isReactiveHref) {
		return (
			<Link
				to={href}
				className={`${className} px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white`}
			>
				{children}
			</Link>
		)
	}

	if (href !== null) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className={`${className} px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white`}
			>
				{children}
			</a>
		)
	}

	return (
		<button
			onClick={() => {
				if (onClick === null) return
				onClick()
			}}
			className={`${className} px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white`}
		>
			{children}
		</button>
	)
}

export default Button
