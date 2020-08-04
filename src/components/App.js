import React, { useState, useEffect } from 'react';
import '../css/app.css'
import Routes from './Routes';
import Header from './Header';
import uuidv4 from 'uuid/v4'
import filterRecipeList from '../function-library/filterRecipeList'
//import Recipes from '../function-library/recipeQuery'


export const RecipeContext = React.createContext() //allow global access of variables and functions, 
//must add Context Wrapper Provider with prop of the objects or functions to make global 
//<RecipeContext.Provider value={recipeContextValue}></RecipeContext.Provider>
// around Highest Level Component and ContextWrapper.Consumer
// around the component using the global varible 
// Requires export and import 
// Requires useContext Hook 

function App() {

  //start of recipes
  const [recipes, setRecipes] = useState(sampleRecipes)
  useEffect( () => {
    
    const fetchDataRecipes = () => {
      return fetch('/recipes')
      .then( res => { console.log('res: ', res)
        return res.json()
      })
      .then( receivedRecipes => { 
        console.log('Received Recipes:', receivedRecipes)
        setRecipes(receivedRecipes)
        })
      .catch(err => {})
    }

    fetchDataRecipes()
  }, [])
  
  
  
  //first array item is the State variable,
  //second array item (setRecipes) is the setState function to modify state (modify the variable)
  //React will auto-render the changed state of the State variable when the setState function is 
  //to modify state
  const [selectedRecipeId, setSelectedRecipeId] = useState() //must bedefined before contextValue
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  const [activeRecipeListName, setActiveRecipeListName] = useState('recipes')
  const [searchedRecipes, setSearchedRecipes] = useState([])
  
  var whichRecipe 
  if (activeRecipeListName === "recipes") { whichRecipe = recipes} 
  else {whichRecipe = searchedRecipes}
    
  const recipeContextValue = {
    recipes,
    activeRecipeListName,
    searchedRecipes,
    selectedRecipe,
    whichRecipe,
    handleRecipeAdd, //same as handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete, //same as handleRecipeDelete: handleRecipeDelete
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
    handleActiveRecipeList,
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
  console.log(recipes)
  }

  function handleRecipeDelete(id) {
    //delete from backend		
    fetch('http://localhost:5002/recipe-delete', {
      method: 'DELETE',
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id.toString()})
      })
      .then(response => response.json())
      .then(data => {
      console.log(`Success, reciped id ${id} deleted`);
      })
      .catch((error) => {
      console.error('Error:', error);
      });
      //set selectedRecipeId to undefined
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
      //delete from frontend
      setRecipes(recipes.filter(recipe => recipe.id !== id))
	}
  

  //function to handle storing edited recipe
  function handleRecipeSelect(id) {
      setSelectedRecipeId(id)
  }

  //allow us to change a recipe

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }
 //New Search Bar for Filtering Recipe List
  function handleRecipeSearch (searchValue) {
    const filteredRecipes = filterRecipeList(searchValue, [...recipes] )
    setSearchedRecipes(filteredRecipes.map(i => i.item))
    console.log("App searchedRecipes ", searchedRecipes)
    console.log("filtered recipes: ", filteredRecipes.map(i => i.item))
    handleActiveRecipeList(searchValue)
  }
  
  function handleActiveRecipeList (searchValue) {
      if (searchValue === '') { 
        setActiveRecipeListName("recipes")
      } 
      else {
        setActiveRecipeListName("searchedRecipes")
      }
    }


  return (
    
    <RecipeContext.Provider value={recipeContextValue}>
    <Header />
    <Routes />
    </RecipeContext.Provider>
    
     
    )
}

const sampleRecipes = [
  {
    "id": 1,
    "name": "Plain Chicken",
    "servings": 3,
    "cookTime": "1:45",
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
  },
  {
    "id": 2,
    "name": "Plain Pork",
    "servings": 5,
    "cookTime": "0:45",
    "instructions": "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    "ingredients": [
      {
        "id": 1,
        "name": "Pork",
        "amount": "3 Pounds"
      },
      {
        "id": 2,
        "name": "Paprika",
        "amount": "2 Tbs"
      }
    ]
  },
  {
    cookTime: "1.25 Hours",
    id: "384fefaf-da0f-4cf3-a653-8b719073f9a6",
    ingredients: 
    [{id: "7a3e98d6-5054-46b8-80b2-a6a9777a7c5d", name: "Lean Spare Ribs", amount: "2 lbs"}
    ,{id: "d4c330b3-493e-4324-947d-36427dd8b941", name: "Flour", amount: "3 Tbsp"}
    ,{id: "cdc8a2f4-f972-433e-a3a1-a7def13e5566", name: "Sherry", amount: "2 Tbsp"}
    ,{id: "1a26b2d1-d305-4f6e-90a7-d12decf003a1", name: "Apple Cider Vinegar", amount: "1.5 Cup"}
    ,{id: "4f31c6a8-4436-4096-b085-8646f103dd93", name: "Water", amount: "0.25 Cup"}
    ,{id: "0d903dd7-1dfb-4f66-9198-9bcfc100e4bd", name: "Fresh Ginger", amount: "1 Thumb"}
    ,{id: "ceb413b6-81b5-4595-b63e-fc093e75a3ec", name: "Garlic", amount: "2 Cloves"}
    ,{id: "02a51bb6-0e23-48c6-889c-f514b10d251b", name: "Salt", amount: "0.5 tsp"}
    ,{id: "be96dbbf-5bdf-49f0-9afc-c5f6255bc973", name: "Soy Sauce", amount: "1 Tbsp"}
    ,{id: "90b15d89-c3e2-4a75-8eea-580ea5a8c3c5", name: "Chinese Thick (Dark) Soy Sauce", amount: "1 Tbsp"}
    ,{id: "1150687e-bf46-4d75-9664-4da9a7108304", name: "Hoi Sin Sauce", amount: "2 tsp"}
    ,{id: "eed09331-ca78-4cb8-80a5-fd72b9d2b7d8", name: "Sugar", amount: "0.75 Cup"}
    ,{id: "99fe69a1-6eb9-48f6-9dad-89f45661da93", name: "Neutral Frying Oil", amount: "as needed "}],
    instructions: "*Sugar is to taste. 3-4 pieces wong tong (chinese brown sugar) and 0.25 cup granulated sugar is a good starting point. Adjust future batches to your liking (I used about 8 tsp white sugar)↵↵1. Sprinkle sherry, then flour over ribs. (or substitute sherry with 0.5x apple cider vinegar) Coat ribs evenly and let marinate for 15 minutes.↵↵2. Fill frying pan with enough oil to submerge ribs 25-50%. Brown ribs on medium-high heat on all sides. ↵↵3. As ribs are browned, put ribs in a large heavy heated pot. Add soy sauces,  crushed garlic and hoi sin sauce. Toss well. Be sue ribs are well-coated with sauce.↵↵4. Level ribs to cover the bottom of the pot. Without stirring futher, add vinegar (adjust amout if necessary--should almost cover the ribs) then the water. Bring to boil. Lower heat, cover pot and simmer for 30 minutes.↵5. Add sugar and continue cooking another 0-25 minutes. watch carefully to prevent scorching and stir only if necessary.  Meat should be tender but not falling off the bone. ↵↵6. If sauce is too thin, thicken with a small amount of cornstarch↵↵--With love from the kitchen of Dorothy C. Wong",
    name: "Chinese Style Sweet Sour Spare Ribs",
    servings: 8
  }
]

export default App;
