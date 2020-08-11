import React, { useState, useContext } from 'react'
import IngredientList from './IngredientList';
import { RecipeContext } from './App'
import ModalDeleteConfirmation from './ModalDeleteConfirmation'

export default function Recipe(props) {
  const {handleRecipeSelect} = useContext(RecipeContext)
  const {
    id,
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    // already delcared by Context handleRecipeDelete
  } = props
  const [isConfirming, setIsConfirming] = useState(false)
  const [isActive, toggleActiveClass] = useState(false)
  const activeClass = isActive ? 'active' : ''
  function handleToggleActiveClass(e){
    if(e.target.className.includes('btn')) return
    isActive ? toggleActiveClass(false) : toggleActiveClass(true)
  }
  
  
  return (
    <>
      {/* JSX IF STATEMENT */}
      <ModalDeleteConfirmation confirming={isConfirming} name={name} id={id} onClose={()=>setIsConfirming(false)}/>

      <div className="recipe">
        <div className={"recipe__header collapsible " + activeClass} onClick={(e)=>handleToggleActiveClass(e)}>
          <h3 className="recipe__title ">{name}</h3>
          <div className="recipe__header__button-container">
            <button 
            className="btn btn--primary mr-1 pulse-button-hover"
            onClick={(e)=> handleRecipeSelect(e, id)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Edit
            </button>
            <button 
              className="btn btn--danger pulse-button-hover"
              onClick={()=>setIsConfirming(true)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Delete
            </button>
          </div>
        </div>
        <div className={"content " + activeClass} onClick={()=>handleToggleActiveClass()}>
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
      </div>
    </>
  )
}