import React, { useContext } from 'react'
import IngredientList from './IngredientList';
import { RecipeContext } from './App'

export default function Recipe(props) {
  const {handleRecipeDelete, handleRecipeSelect} = useContext(RecipeContext)
  const {
    id,
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    // already delcared by Context handleRecipeDelete
  } = props
  return (
      <div className="recipe">
        <div className="recipe__header">
          <h3 className="recipe__title">{name}</h3>
          <div>
            <button 
            className="btn btn--primary mr-1 pulse-button-hover"
            onClick={()=> handleRecipeSelect(id)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Edit
            </button>
            <button 
              className="btn btn--danger pulse-button-hover"
              onClick={()=>handleRecipeDelete(id)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Delete
            </button>
          </div>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Cook Time:</span>
          <span className="recipe__value">{cookTime}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Servings:</span>
          <span className="recipe__value">{servings}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Instructions:</span>
          <div className="recipe__value recipe__value--indented recipe__instructions ">{instructions}</div>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Ingredients:</span>
          <div className="recipe__value recipe__value--indented">
            <IngredientList ingredients={ingredients} />
          </div>
        </div>
      </div>
  )
}