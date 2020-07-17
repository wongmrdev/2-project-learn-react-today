import React, { useContext, useEffect }  from 'react'
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeContext } from './App'

export default function Header() {
	const { handleRecipeSearch, 
			activeRecipeListName,
			searchedRecipes,
			recipes  } = useContext(RecipeContext)
			
	return (
		<div className="app-header">
			<span>Recipe</span>
		    <RecipeSearchBar/>			
		</div>
	)
}