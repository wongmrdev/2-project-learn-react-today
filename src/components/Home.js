import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'
import { RecipeContext } from './App'
import { setBackendUrl } from '../config.js'
let backendUrl = setBackendUrl()

function Home() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    selectedRecipe,
    whichRecipe,
    setRecipes,
  } = useContext(RecipeContext)



  useEffect(() => {
    async function handleGetRecipes() {
      console.log(backendUrl)
      fetch(backendUrl + '/recipes', {
        credentials: "include",
      })
        .then(res => {
          console.log('res: ', res)
          return res.json()
        })
        .then(receivedRecipes => {
          if (receivedRecipes.success === false || receivedRecipes.success === null || typeof receivedRecipes.success === undefined) {
            return setIsAuthenticated(false)
          }
          console.log('Received Recipes:', receivedRecipes)

          if (receivedRecipes.success === true) {
            setRecipes(receivedRecipes.recipes)
          }
        })
        .catch(err => { console.log(err) })
    }

    if (isAuthenticated) {
      handleGetRecipes();
    }
  }
    , [isAuthenticated, setIsAuthenticated, setRecipes])




  return (
    <>
      {!isAuthenticated ? <Redirect to='/login'></Redirect> : <RecipeList recipes={whichRecipe} />}
      {/* without context the props must be passed down as:
      handleRecipeAdd={handleRecipeAdd}
      handleRecipeDelete={handleRecipeDelete}
    */}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />} {/* JSX if statement*/}
    </>
  )
}



export default Home;