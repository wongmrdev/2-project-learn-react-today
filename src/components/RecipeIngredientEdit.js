import React from 'react'


export default function RecipeIngredientEdit(  props ) {
	const { ingredient, handleIngredientChange, handleIngredientDelete } = props

	function handleChange(changes) {
		handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
	}

	return (
		<>
			<input 
			type="text" 
			className="recipe-edit__input"
			value={ingredient.name}
			onChange={event => handleChange({name: event.target.value})}/>
			<input 
			type="text" 
			className="recipe-edit__input"
			value={ingredient.amount}
			onChange={event => handleChange({amount: event.target.value})}
			/>
			<button 
				className="btn btn--danger"
				onClick={() => handleIngredientDelete(ingredient.id)}
			>&times;</button>
		</>
	)
}