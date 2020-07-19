import React from 'react'


export default function RecipeIngredientEdit(  props ) {
	const { ingredient,
	 handleIngredientChange,
	  handleIngredientDelete,
	  handleIngredientAdd } = props

	function handleChange(changes) {
		handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
	}


	function onKeyUpEnterKey (event) {
	    var code = event.charCode || event.keyCode;
	    if (code === 13 || code === 9) {
	        handleIngredientAdd();
	    }
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
			onKeyUp={event => onKeyUpEnterKey(event)}/>
			<button 
				className="btn btn--danger"
				onClick={() => handleIngredientDelete(ingredient.id)}
			>&times;</button>
		</>
	)
}