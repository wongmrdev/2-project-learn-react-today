import React, { useContext } from 'react';
import { RecipeContext } from './App'
import RecipeIngredientEdit from './RecipeIngredientEdit'  //used to allow a child component to be used in this component JSX
import uuidv4 from 'uuid/v4'
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import postData from '../function-library/postData'

export default function RecipeEdit({recipe}) {
	
	console.log('RecipeEdit Rendered')
	const { handleRecipeChange,
		 handleRecipeSelect,
		selectedRecipe } = useContext(RecipeContext)

	function handleChange(changes) {
		handleRecipeChange(recipe.id, {...recipe, ...changes })
	}

	function handleIngredientChange(id, ingredient){
		const newIngredients = [...recipe.ingredients]
    	const index = newIngredients.findIndex(i => i.id === id)
    	newIngredients[index] = ingredient
    	handleChange({ ingredients: newIngredients })
	}

	function handleIngredientAdd(){
    	
    	const newIngredient = {
     	    id: uuidv4(),
      	    name: '',
     	    amount: ''
    	}

    	handleChange({ ingredients: [...recipe.ingredients, newIngredient]})    
  	}

  	function handleIngredientDelete(id) {
  		handleChange({ingredients: recipe.ingredients.filter(i => i.id !== id)})
	  }
	
	function handleRecipeSubmit() {

		fetch('http://localhost:5002/recipe-upsert', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(selectedRecipe),
		})
		.then(response => response.json())
		.then(data => {
		console.log('Success:', data);
		})
		.catch((error) => {
		console.error('Error:', error);
		});
	}

	return (	
		<div>
			<div className="recipe-edit" >
				<div className="recipe-edit__container">
					<div className="recipe-edit__header-buttons-container">
						<div className="recipe-edit__remove-button-container">
							<FontAwesomeIcon icon= { faStepBackward } 
							className="btn recipe-edit__remove-button"
							onClick={() => handleRecipeSelect(undefined)}
							>
							</FontAwesomeIcon>				
						</div>
						<div></div>
						<div className="recipe-edit__post-recipe-to-database-button-container">
							<button 
							className="btn recipe-edit__save-button"
							onClick={() => handleRecipeSubmit()}>
							Save
							</button>
						</div>
					</div>
				</div>	
			    <div className="recipe-edit__details-grid">
			    	<label 
				    	htmlFor="name" 
				    	className="recipe-edit__label">
				    	Name
			    	</label>
			    	<input 
				    	type="text" 
				    	name="name" 
				    	id="name" 
				    	className="recipe-edit__input"
				    	value={recipe.name}
				    	onChange={ event => handleChange({name: event.target.value})}
			    	/>
			      	<label 
				      	htmlFor="cookTime" 
				      	className="recipe-edit__label">
				      	Cook Time
			      	</label>
			    	<input 
				    	type="text" 
				    	name="cookTime" 
				    	id="cookTime" 
				    	className="recipe-edit__input"
				    	value={recipe.cookTime}
				    	onChange={ event => handleChange({cookTime: event.target.value})}
			    	/>
			       	<label 
				       	htmlFor="servings" 
				       	className="recipe-edit__label">
				       	Servings
			       	</label>
			    	<input 
				    	type="number" 
				    	min="1" 
				    	name="servings" 
				    	id="servings" 
				    	className="recipe-edit__input"
				    	value={recipe.servings}
				    	onChange={ event => handleChange({servings: parseInt(event.target.value) || ''})}
				    />
			      	<label 
				      	htmlFor="instructions" 
				      	className="recipe-edit__label">
				      	Instructions
			      	</label>
			    	<textarea 
			    		type="text" 
			    		name="instructions"
			    		id="instructions" 
			    		className="recipe-edit__input"
			    		onChange={ event => handleChange({instructions: event.target.value})}
			    		value={recipe.instructions}
			    	></textarea>
			    </div>
			    <br/>
			    <label 
			    	className="recipe-edit__label">
			    	Ingredients
			    </label>
			    <div className='recipe-edit__ingredient-grid'>
			    	<div>Name</div>
			    	<div>Amount</div>
			    	<div></div>
			    	{recipe.ingredients.map( ingredient => (
			    		<RecipeIngredientEdit 
			    		key={ingredient.id} 
			    		ingredient={ingredient}
			    		handleIngredientChange={handleIngredientChange}
			    		handleIngredientDelete={handleIngredientDelete}
			    		handleIngredientAdd={handleIngredientAdd}/>
			    	))}
			    				    </div>
			    <div className="recipe-edit__add-ingredient-button-container">
			    	<button 
			    		className="btn btn--primary" 
			    		onClick={() => handleIngredientAdd()}>
			    	Add Ingredient
			    	</button>
			    </div>
			</div>
		</div>
	)
}