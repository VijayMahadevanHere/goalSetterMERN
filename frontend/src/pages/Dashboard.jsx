import { useEffect } from "react"
import{useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import GoalForm from "../components/goalForm"
import { getGoal } from "../features/goals/goalSlice"
import Spinner from '../components/spinner'
import GoalItem from "../components/goalItem"
import { toast } from "react-toastify"
function Dashboard() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.auth)
const {goal,isLoading,isError,message}=useSelector((state)=>state.goal)


  useEffect(()=>{
    if(isError){
   console.log(message);

    }

    if(!user){
      navigate('/login')
    }
 
    dispatch(getGoal())
    
    
  
  },[user,navigate,message,isError,dispatch])


  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section>
      <h1>Welcome To Dashboard {user && user.name}.</h1>
      </section>
  <GoalForm/>
   
   <section className="content">
    {goal.length > 0 ? (
      <div className="goals">
        {goal.map((item)=>(
          <GoalItem key={item._id} goal={item}/>

        ))}
      </div>
    ) : (<h3>You have not set any goals</h3>)}
   </section>
  
   </>
  )
}

export default Dashboard
