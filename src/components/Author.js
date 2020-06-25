import React from 'react'

export default function Author({ name, email }) {
	return (
		<>
		<span>{name}</span>
		<span>{email}</span>	
		</>
	)
}