import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
    
   const authCtx = useContext(AuthContext)


   const submitHandler = e => {
       e.preventDefault()

       const url = 'https://socialmtn.devmountain.com'

       const body = {
        username,
        password
       }
  
        axios.post(register ? `${url}/register` : `${url}/login`, body).then( ({data}) => {
            console.log(`Submit handler in Auth.js actioned`, data)
            authCtx.login(data.token, data.expiration, data.userId)
        }).catch( (err) => {
            console.log(`error message from submit handler`, err.message)
            setPassword('')
            setUsername('')
        })

 
       console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input' type='text' placeholder='Username' value={username} 
                   onChange={ele => setUsername(ele.target.value)}/>
               <input
                   className='form-input' type="password" placeholder='Password' value={password}
                   onChange={ele => setPassword(ele.target.value)}/>

               <button className='form-btn' >
                   {register ? 'Sign Up' : 'Login'}
               </button>

           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth