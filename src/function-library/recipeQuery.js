import { useQuery } from 'react-query'
import React from 'react'

const fetchRecipes = async  () => {
    const res = await fetch('/recipes');
    return res.json()
}

const Recipes = () => {
    const { data, status } = useQuery('recipes',  fetchRecipes)
    console.log("data",data)
    console.log(status)
    return (
        <div>
            <div>planets</div>
            {status === 'loading' && (<div>Loading Data...</div>)}
            {status === 'error' && (<div>Error Loading Data...</div>)}
            {status === 'success' && (<div>{data.map((recipe)=><div>{recipe.name}</div>)}</div>)}
        </div>        
    )
            
}

export default Recipes