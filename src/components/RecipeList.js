import React, { useContext } from 'react'
import Recipe from './Recipe'
import {RecipeContext} from './App'
export default function RecipeList(props) {
  const { handleRecipeAdd } = useContext(RecipeContext)
  const {
    recipes //,
    // without context, props must be pushed down each component to the child components
    // with Context, props can "jump over" components, reducing code and clutter
    // handleRecipeAdd, can be removed because it's being handled by Context in Recipe.js 
    // handleRecipeDelete can be removed because it's being handled by Context in Recipe.js
  } = props
  return (
    <div className="recipe-list">
      <div>
        {recipes.map(recipe => {
          return (
            <Recipe
              key={recipe.id}
              //handleRecipeDelete={handleRecipeDelete} removed via Context
              {...recipe}
            />
          )
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button 
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
        Add Recipe</button>
      </div>
    </div>
  )
}