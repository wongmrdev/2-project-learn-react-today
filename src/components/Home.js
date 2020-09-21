import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'
import { RecipeContext } from './App'
import {setBackendUrl} from '../config.js'
let backendUrl = setBackendUrl()

function Home() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    selectedRecipe,
    whichRecipe,
    setRecipes,
    recipes } = useContext(RecipeContext)

  async function handleGetRecipes() {
    console.log(backendUrl)
     fetch(backendUrl+'/recipes', {
      credentials: "include",
    })
    .then( res => { console.log('res: ', res)
      return res.json()
    })
    .then( receivedRecipes => { 
      if(receivedRecipes.success === false || receivedRecipes.success === null || typeof receivedRecipes.success === undefined) {
          return setIsAuthenticated(false)
      }
      console.log('Received Recipes:', receivedRecipes)
      console.log('receivedRecipes.success:', receivedRecipes.success)
      if(receivedRecipes.success === true) {
        setRecipes(receivedRecipes.recipes)
        console.log(recipes)
      }
    })
    .catch(err => {})
    }

  useEffect( ()=> {
      if(isAuthenticated) { 
        handleGetRecipes();
      }
    }
    , [isAuthenticated])
  

  
  
  return (
      <>
      {!isAuthenticated ? <Redirect to='/login'></Redirect> : <RecipeList recipes={whichRecipe}/>}
      {/* without context the props must be passed down as:
      handleRecipeAdd={handleRecipeAdd}
      handleRecipeDelete={handleRecipeDelete}
    */}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>} {/* JSX if statement*/}
    </>
      )
}



export default Home;