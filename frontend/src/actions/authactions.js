import axios from 'axios'


export const setCurrentUser = (context) => {
  axios.get('http://127.0.0.1:8000/api/details')
  .then(res =>{
    console.log(res.data)
    context.setUser(res.data)
  })
  .catch(err =>{
    console.log(err.response.data)
    context.setUser({})
  })
}