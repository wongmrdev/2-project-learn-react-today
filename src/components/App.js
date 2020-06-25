import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import uuidv4 from 'uuid/v4'
import RecipeEdit from './RecipeEdit'
import filterRecipeList from '../function-library/filterRecipeList'

export const RecipeContext = React.createContext() //allow global access of variables and functions, 
//must add Context Wrapper Provider with prop of the objects or functions to make global 
//<RecipeContext.Provider value={recipeContextValue}></RecipeContext.Provider>
// around Highest Level Component and ContextWrapper.Consumer
// around the component using the global varible 
// Requires export and import 
// Requires useContext Hook 

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes) //first array item is the State variable,
  //second array item (setRecipes) is the setState function to modify state (modify the variable)
  //React will auto-render the changed state of the State variable when the setState function is 
  //to modify state
  const [selectedRecipeId, setSelectedRecipeId] = useState() //must bedefined before contextValue

  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  const recipeContextValue = {
    handleRecipeAdd, //same as handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete, //same as handleRecipeDelete: handleRecipeDelete
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
    handleActiveRecipeList
  } //Ojbect with values representing variables and functions required as a prop for RecipeContext

  const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'
  //get local storage before setting (order matters)
  useEffect(() => {
      const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (recipesJSON != null) setRecipes(JSON.parse(recipesJSON))
    
  }, [])
  
  useEffect(() => { //do something everytime the App is re-rendered
    console.log('rendered')
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes)) //local storage can only store strings
    return () => console.log('recipes set')
  }, [recipes]) //second parameter is array of variables which trigger re-render. 
  //[] means only run on reload, not on subsequent renders. 
  
  //add a state that stores the active edit recipe 
  
  function handleRecipeAdd() {
  const newRecipe = {
    id: uuidv4(),
    name: '',
    servings: 1,
    cookTime: '',
    instructions: '',
    ingredients: [
    {id: uuidv4(), name: '', amount: ''}]
  }
  setSelectedRecipeId(newRecipe.id)
  setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
      setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  //function to handle storing edited recipe
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  //allow us to change a recipe

  function handleRecipeChange(id, recipe) {
    const newRecipe = [...recipes]
    const index = newRecipe.findIndex(r => r.id === id)
    newRecipe[index] = recipe
    setRecipes(newRecipe)
  }

 //New Search Bar for Filtering Recipe List
  const [activeRecipeListName, setActiveRecipeListName] = useState('recipes')
  const [searchedRecipes, setSearchedRecipes] = useState([])
  
  function handleRecipeSearch (searchValue) {
    handleActiveRecipeList(searchValue)
    const filteredRecipes = filterRecipeList(searchValue, [...recipes] )
    setSearchedRecipes(filteredRecipes.map(i => i.item))

  }
  
  function handleActiveRecipeList (searchValue) {
      if (searchValue === '') { 
        setActiveRecipeListName("recipes")
      } 
      else {
        setActiveRecipeListName("searchedRecipes")
        //setSearchedRecipes(filterRecipesList(searchValue, recipesToSearch))
      }  
      console.log("Active Recipe List Name (recipes or searchedRecipes: " + activeRecipeListName)
    }

  var whichRecipe 
  if (activeRecipeListName === "recipes") { whichRecipe = recipes} 
  else {whichRecipe = searchedRecipes}
  
  useEffect(() => { //do something everytime the App is re-rendered
    return () => console.log('whichRecipe set: ' + activeRecipeListName)
  }, [activeRecipeListName])
// End New Search Bar for Filtering Recipe List
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={whichRecipe}/> 
      {/* without context the props must be passed down as:
      handleRecipeAdd={handleRecipeAdd}
      handleRecipeDelete={handleRecipeDelete}
    */}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>} {/* JSX if statement*/}
      
  
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;