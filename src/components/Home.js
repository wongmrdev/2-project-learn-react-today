import React, { useContext, useEffect, useState } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'
import { RecipeContext } from './App'
import {setBackendUrl} from '../config.js'
import { set } from 'mongoose';
let backendUrl = setBackendUrl()

function Home() {
  const {
    selectedRecipe,
    whichRecipe,
    setRecipes } = useContext(RecipeContext)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
        if(receivedRecipes.success === true) {
          setRecipes(receivedRecipes)
          setIsAuthenticated(true)
        }
        else {
          setRecipes(unauthorizedRecipes)
          setIsAuthenticated(false)

        }
        
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

const unauthorizedRecipes = [{
  "id": 1,
  "name": "Unauthorized Login, please login or register a new account",
  "servings": 3,
  "cookTime": "1:45",
  "authors": [{id: 1, name:'mwong', email: 'matthew.raymond.wong@gmail.com'}],
  "historicalAuthor":'nbunny',
  "originCountry":'',
  "originWorldRegion":'',
  "instructions": "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
  "ingredients": [
    {
      "id": 1,
      "name": "Chicken",
      "amount": "2 Pounds"
    },
    {
      "id": 2,
      "name": "Salt",
      "amount": "1 Tbs"
    }
  ]
}]

export default Home;