import {Button} from '@mui/material'
import React from 'react'
import SignIn from './Signin'
import SignUp from './Signup'
function Dashboard(){
    return(
    <>
    <Button variant = "contained" color ="primary" href ="/signin">
    Sign In
    </Button>
    <Button variant = "contained" color ="primary" href ="/signup">
    Sign Up
    </Button>
    </>
  )
}
export default Dashboard
