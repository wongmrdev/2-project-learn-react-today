let backendUrl = ''
console.log("conditional", process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development')
//pushing to heroku on master branch will cause NODE_ENV to default to 'productions'
//pushing to heroku on non-master branch will cause NODE_ENV to default to 'development'
if(process.env.NODE_ENV === 'production'){ 
    backendUrl = 'https://desolate-inlet-08825.herokuapp.com'
    } else {
    backendUrl = 'http://localhost:5002' //port XXXX set in family-recipe-app-recipeServer/.env -->PORT=5002
    }
export default backendUrl