let backendUrl = ''
console.log("process.NODE_ENV:", process.NODE_ENV)
console.log("process.env.NODE_ENV:", process.env.NODE_ENV)
if(process.NODE_ENV !=='production'){
    require('dotenv').config()
}
console.log("conditional", process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development')
//pushing to heroku on master branch will cause NODE_ENV to default to 'productions'
//pushing to heroku on non-master branch will cause NODE_ENV to default to 'development'
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development'){ 
    backendUrl = 'https://desolate-inlet-08825.herokuapp.com'
    } else {
    backendUrl = 'http://localhost:5002' //port XXXX set in family-recipe-app-recipeServer/.env -->PORT=5002
    }
console.log("backendUrl:", backendUrl)
export default backendUrl