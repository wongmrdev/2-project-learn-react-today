//import libraries
import React, { useContext } from 'react'
import uuidv4 from 'uuid/v4'
//import components, context
import { RecipeContext } from './App'
import RecipeIngredientEdit from './RecipeIngredientEdit'  //used to allow a child component to be used in this component JSX
import RecipeAuthorEdit from './RecipeAuthorEdit'
//import icons 
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import user-functions, global variables
import backendUrl from '../function-library/setBackendUrl'

export default function RecipeEdit({recipe}) {
	const { handleRecipeChange,
		handleRecipeSelect,
	   selectedRecipe } = useContext(RecipeContext)
	//handle missing data
	console.log("recipeEdit recipe.authors:", recipe.authors)
	if(recipe.authors === undefined) { 
			recipe.authors = [{id: uuidv4(), name: "", email: ""}]
		} 
	console.log("recipeEdit recipe.authors:", recipe.authors)
	
	

		
	
		// recipe.historicalAuthor === undefined ? handleChange({historicalAuthor: ""})  : 
		// recipe.originCountry === undefined ? handleChange({originCountry: ""}) : 
		// recipe.originWorldRegion === undefined ? handleChange({originWorldRegion: ""}) :
	

	console.log('RecipeEdit Rendered')
	

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

	function handleAuthorChange(id, author){
		const newAuthors = [...recipe.authors]
    	const index = newAuthors.findIndex(i => i.id === id)
    	newAuthors[index] = author
    	handleChange({ authors: newAuthors })
	}

	function handleAuthorAdd(){
    	
    	const newAuthor = {
     	    id: uuidv4(),
      	    name: '',
     	    email: ''
    	}

    	handleChange({ authors: [...recipe.authors, newAuthor]})    
  	}

  	function handleAuthorDelete(id) {
  		handleChange({authors: recipe.authors.filter(i => i.id !== id)})
	  }
	
	function handleRecipeSubmit() {
		fetch(backendUrl+'/recipe-upsert', {
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
							onClick={(e) => {handleRecipeSubmit(); handleRecipeSelect(e,undefined)}}
							>
							</FontAwesomeIcon>				
						</div>
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
					
					<label 
				      	htmlFor="historicalAuthor" 
				      	className="recipe-edit__label">
				      	Historical Author
			      	</label>
			    	<input 
			    		type="text" 
			    		name="historicalAuthor"
			    		id="historicalAuthor" 
			    		className="recipe-edit__input"
			    		onChange={ event => handleChange({historicalAuthor: event.target.value})}
			    		value={recipe.historicalAuthor}
			    	></input>
					<label 
				      	htmlFor="originCountry" 
				      	className="recipe-edit__label">
				      	Country Origin
			      	</label>
			    	<input 
			    		type="text" 
			    		name="originCountry"
			    		id="originCountry" 
			    		className="recipe-edit__input"
			    		onChange={ event => handleChange({originCountry: event.target.value})}
			    		value={recipe.originCountry}
			    	></input>
					<label 
				      	htmlFor="originWorldRegion" 
				      	className="recipe-edit__label">
				      	World Origin Region
			      	</label>
					<input 
				    	type="text"
						list="originWorldRegion" 
				    	name="originWorldRegion" 
				    	id="originWorldRegion" 
				    	className="recipe-edit__input"
						value={recipe.originWorldRegion}
						onChange={ event => handleChange({originWorldRegion: event.target.value})}
				    />
					<datalist id="originWorldRegion">
							<option key="1" value="Africa"/>
							<option key="2"  value="Americas"/>
							<option key="3" value="Asia"/>
							<option key="4" value="Europe"/>
							<option key="5" value="Oceania"/>
					</datalist>
			    </div>
				<br/>
				<label 
				className="recipe-edit__label">
				Author(s)
				</label>
				<div className='recipe-edit__ingredient-grid'>
					<div>Name</div>
					<div>Email</div>
					<div></div>
					{recipe.authors.map( author => (
						<RecipeAuthorEdit 
						key={author.id} 
						author={author}
						handleAuthorChange={handleAuthorChange}
						handleAuthorDelete={handleAuthorDelete}
						handleAuthorAdd={handleAuthorAdd}/>
					))}
				</div>
				<div className="recipe-edit__add-author-button-container">
					<button 
						className="btn btn--primary" 
						onClick={() => handleAuthorAdd()}>
					Add Author
					</button>
				</div>
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