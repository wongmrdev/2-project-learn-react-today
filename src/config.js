export const setBackendUrl = () =>  {
    if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:5002' 
    } else {
        return 'https://desolate-inlet-08825.herokuapp.com/'
    }

}

