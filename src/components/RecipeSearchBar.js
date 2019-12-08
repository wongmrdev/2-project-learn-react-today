import React from 'react'

export default function RecipeSearchBar({ handleRecipeSearch, handleActiveRecipeList }) {
	function onKeyUpEscKey (event) {
	    var code = event.charCode || event.keyCode;
	    if (code == 27) {
	        event.target.value = '';
	    }
	}

	return (
		<div className="recipe-search-bar-container">
			<input 
			type='text'
			placeholder='Search Recipe'
			id='recipe-search-bar'
			className='recipe-search-bar__input'
			onChange={event => handleRecipeSearch(event.target.value)}
			onKeyUp={event => onKeyUpEscKey(event)} />
		</div>
	)
}