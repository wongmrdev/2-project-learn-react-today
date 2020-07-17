import Fuse from 'fuse.js'

export default function filterRecipeList(searchValue, recipesToSearch) {
	const options = {
		  shouldSort: true,
		  tokenize: true,
		  threshold: 0.3,
		  location: 0,
		  distance: 100,
		  maxPatternLength: 32,
		  minMatchCharLength: 1,
		  keys: [
		    "id",
		    "name",
		    "ingredients.name"

  		  ]
	};
	console.log(`recipes to search: ${recipesToSearch}`)
	console.log("handleRecipeSearch options: " + options)
	const fuse = new Fuse(recipesToSearch,options); // "list" is the item array
	console.log("handleRecipeSearch searchValue: " + searchValue)
	const result = fuse.search(searchValue);
	console.log(`fuse search results: ${JSON.stringify(result)}`)
	return result
}