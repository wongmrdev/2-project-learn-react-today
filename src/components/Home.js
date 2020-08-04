import React, { useContext } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'
import { RecipeContext } from './App'


function Home() {
  const { selectedRecipe,
    whichRecipe } = useContext(RecipeContext)
  
  
  
  return (
    <>
      <RecipeList recipes={whichRecipe}/> 
      {/* without context the props must be passed down as:
      handleRecipeAdd={handleRecipeAdd}
      handleRecipeDelete={handleRecipeDelete}
    */}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>} {/* JSX if statement*/}
    </>   
      )
}



export default Home;