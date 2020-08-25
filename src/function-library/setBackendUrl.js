
//pushing to heroku on master branch will cause NODE_ENV to default to 'productions' ?
//pushing to heroku on non-master branch will cause NODE_ENV to default to 'development' ?
let backendUrl = ''
if(process.env.NODE_ENV === 'production') {
    backendUrl = 'https://desolate-inlet-08825.herokuapp.com/'
} else
{backendUrl = 'http://localhost:5002' //process.env.BACKEND_URL
}
console.log(`backendURL ${backendUrl}`)
export default backendUrl