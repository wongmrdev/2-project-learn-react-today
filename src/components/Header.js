import React, { useContext }  from 'react'
import { Link } from 'react-router-dom';
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeContext } from './App'
import { faSignInAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import FRLogo from './FR-logo'
import Logout from './login/Logout'

export default function Header() {
	const { handleRecipeAdd } = useContext(RecipeContext)
	
	
	return (
		<div className="app-header">
			<Link to="/home" className="fr-logo">FR</Link>
					
		    <RecipeSearchBar/>
		    <Link to="/home">
				<button 
					className="btn btn--header btn--primary btn--header__recipe-add"
					onClick={handleRecipeAdd}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<FontAwesomeIcon icon={faPlus}/> Recipe
				</button>
			</Link>
			{!localStorage.getItem("isLoggedIn") && <Link to="/login">
				<div className="btn--header header__logout-icon">
					<FontAwesomeIcon icon={faSignInAlt} />
				</div>
			</Link>}
			{localStorage.getItem("isLoggedIn") && <Logout />}
				
			
			
		</div>
	)
}