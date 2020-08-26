import React, { useContext, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'
import { RecipeContext } from './App'
import backendUrl from '../function-library/setBackendUrl'

function Home() {
  const {
    selectedRecipe,
    whichRecipe,
    setRecipes } = useContext(RecipeContext)

  useEffect( ()=> {
    async function handleGetRecipes () {
      console.log(backendUrl)
      fetch(backendUrl+'/recipes', {
        credentials: "include",
      })
      .then( res => { console.log('res: ', res)
        return res.json()
      })
      .then( receivedRecipes => { 
        console.log('Received Recipes:', receivedRecipes)
        setRecipes(receivedRecipes)
        })
      .catch(err => {})
      }
    handleGetRecipes();
    }
    , [])
  
  
  
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