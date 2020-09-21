import React, { useContext,  }  from 'react'
import { Link, useLocation } from 'react-router-dom';
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeContext } from './App'
import { faSignInAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import FRLogo from './FR-logo'
import Logout from './login/Logout'

export default function Header() {
	const { handleRecipeAdd, isAuthenticated } = useContext(RecipeContext)
	const location = useLocation();
	console.log(location);
	return (
		<div className="app-header">
			<Link to="/home" className="fr-logo">FR</Link>
					
		    <RecipeSearchBar/>
		    <Link to="/home">
				{location.pathname !== '/login' && <button 
					className="btn btn--header btn--primary btn--header__recipe-add"
					onClick={handleRecipeAdd}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<FontAwesomeIcon title="add recipe" icon={faPlus}/> Recipe
				</button>}
			</Link>
			{!isAuthenticated && location.pathname !== '/login' && <Link to="/login">
				<div className="btn--header header__login-logout-icon">
					<FontAwesomeIcon title="login" icon={faSignInAlt} />
				</div>
			</Link>}
			{isAuthenticated && <Logout />}
				
			
			
		</div>
	)
}