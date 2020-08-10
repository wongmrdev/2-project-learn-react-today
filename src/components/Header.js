import React, { useContext }  from 'react'
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeContext } from './App'
import { faSignInAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FRLogo from './FR-logo'
//import { library } from '@fortawesome/fontawesome-svg-core';

export default function Header() {
	const { handleRecipeAdd } = useContext(RecipeContext)
	return (
		<div className="app-header">
			<FRLogo/>
		    <RecipeSearchBar/>
		     
		    <button 
	          	className="btn btn--primary btn--header"
	          	onClick={handleRecipeAdd}>
	        	<span></span>
		    	<span></span>
		    	<span></span>
		    	<span></span>
	        	<FontAwesomeIcon icon={faPlus}/> Recipe
	        </button>
		    <div className="header__logout-icon">
		    <FontAwesomeIcon icon={faSignInAlt}/> 
			</div>		
		</div>
	)
}