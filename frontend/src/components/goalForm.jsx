import { useState} from 'react'
import { useDispatch } from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'


function GoalForm() {

    const dispatch=useDispatch()
   const[text,setText]= useState('')

    const onSubmit=(e)=>{
        e.preventDefault()

        dispatch(createGoal({text}))
        setText('')

    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
     <div className="form-group">
        <label htmlFor="text">Goal</label>
        <input 
        type="text" 
        id='text'
        value={text}
        onChange={(e)=>{
            setText(e.target.value)
        }}
        
        />

     </div>
     <div className="form-group">
        <button type='submit' className="btn btn-block">Set Goal</button>
     </div>
     </form>
    </section>
  )
}

export default GoalForm
