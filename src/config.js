export const setBackendUrl = () =>  {
    if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:5002' 
    } else {
        return 'https://secure-hollows-38145.herokuapp.com'
    }

}

