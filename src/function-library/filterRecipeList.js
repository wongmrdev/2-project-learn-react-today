import Fuse from 'fuse.js'

export default function filterRecipeList(searchValue, recipesToSearch) {
	var options = {
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
	console.log(recipesToSearch)
	console.log("handleRecipeSearch options: " + options)
	var fuse = new Fuse(recipesToSearch,options); // "list" is the item array
	console.log("handleRecipeSearch searchValue: " + searchValue)
	var result = fuse.search(searchValue);
	return result
}