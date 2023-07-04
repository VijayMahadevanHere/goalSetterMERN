import axios from 'axios'
const USER_API='/api/users/'
const register=async(userData)=>{



  let response=await axios.post(USER_API,userData)
    
if(response.data){
    localStorage.setItem('user',JSON.stringify(response.data))
   
}

return response.data



}

const login= async(userData)=>{
 let response =await axios.post(USER_API +'login',userData)
 console.log(response.data,'response');
 if(response.data){
  localStorage.setItem('user',JSON.stringify(response.data))
 }
 return response.data
}

const logout=()=>{
  localStorage.removeItem('user')
}



const authService={
    register,
    logout,
    login
}


export default authService; 