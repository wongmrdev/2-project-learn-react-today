import React, { }  from 'react'
import RecipeSearchBar from './RecipeSearchBar'
import { } from './App'
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { library } from '@fortawesome/fontawesome-svg-core';

export default function Header() {
	
	return (
		<div className="app-header">
			<header>Recipe</header>
		    <RecipeSearchBar/>
		    <FontAwesomeIcon icon={faSignInAlt}/> 		
		</div>
	)
}