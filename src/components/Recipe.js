import React, { useState, useContext } from 'react'
import IngredientList from './IngredientList';
import AuthorList from './AuthorList';
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
    authors,
    historicalAuthor,
    originCountry,
    originWorldRegion
    // already delcared by Context handleRecipeDelete
  } = props
  const [isConfirming, setIsConfirming] = useState(false)
  const [isActive, toggleActiveClass] = useState(false)
  const activeClass = isActive ? 'active' : ''
  
  function handleToggleActiveClass(e){
      if (e.target.className.includes('btn', 'recipe__label', 'recipe__value')) return
    
    isActive ? toggleActiveClass(false) : toggleActiveClass(true)
  }
  
  if(authors[0]) console.log(authors[0].name)
  
  return (
    <>
      {/* JSX IF STATEMENT */}
      <ModalDeleteConfirmation confirming={isConfirming} name={name} id={id} onClose={()=>setIsConfirming(false)}/>

      <div className="recipe">
        <div className={"recipe__header collapsible " + activeClass} onClick={(e)=>handleToggleActiveClass(e)}>
          <h3 className="recipe__title ">{name}</h3>
          <p className="first-author">{authors[0] ? authors[0].name : "anon"}</p>
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
        <div className={"content " + activeClass} onClick={(e)=>handleToggleActiveClass(e)}>
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
            <span className="recipe__label">Author(s):</span>
            <div className="recipe__value recipe__value--indented">
              <AuthorList authors={authors} />
            </div>
          </div>
          <div className="recipe__row">
            <span className="recipe__label">Originating Author:</span>
            <span className="recipe__value">{historicalAuthor}</span>
          </div>
          <div className="recipe__row">
            <span className="recipe__label">Country:</span>
            <span className="recipe__value">{originCountry}</span>
          </div>
          <div className="recipe__row">
            <span className="recipe__label">World Region:</span>
            <span className="recipe__value">{originWorldRegion}</span>
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