import React, { useContext }  from 'react'
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeContext } from './App'
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { library } from '@fortawesome/fontawesome-svg-core';

export default function Header() {
	const { handleRecipeAdd } = useContext(RecipeContext)
	return (
		<div className="app-header">
			
			<header>Recipe</header>
		    
		    <RecipeSearchBar/>
		     
		    <button 
	          	className="btn btn--primary"
	          	onClick={handleRecipeAdd}>
	        	<span></span>
		    	<span></span>
		    	<span></span>
		    	<span></span>
	        	Add Recipe
	        </button>
		    
		    <FontAwesomeIcon icon={faSignInAlt}/> 		
		</div>
	)
}