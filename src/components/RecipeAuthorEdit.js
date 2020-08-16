import React from 'react'

export default function RecipeAuthorEdit(props) {
	const { 
		author, 
		handleAuthorChange, 
		handleAuthorDelete
	} = props

	function handleChange(changes) {
		handleAuthorChange(author.id, {...author, ...changes})
	}

	return (
		<>
			<input
				type="text"
				className="recipe-edit__input"
				value={author.name}
				onChange={event => handleChange({name: event.target.value})}
			/>
			<input
				type="email"
				className="recipe-edit__input"
				value={author.email}
				onChange={event => handleChange({email: event.target.value})}
			/>
			<button
				className="btn btn--danger"
				onClick={() => handleAuthorDelete(author.id)}
				>&times;
			</button>
		</>
	)
}