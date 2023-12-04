
import React from 'react'
import {useNavigate} from "react-router-dom"

export default function Wrapper({children}:any) {
    const navigate:any= useNavigate()
  return children(navigate)
}
