
import React, { Component, ChangeEvent, FormEvent ,CSSProperties} from 'react'
import {Navigate} from "react-router-dom"
import {client}  from "./App"
// import {useMutation,useQuery} from "@apollo/client"
import {CREATE_USER,GET_USERS} from "./apis"

// type  State ={
//   name: string,
//   email: string,
//   password:string,
  

// }
type Props= {word:string
cred:string}


export default class Signup extends Component {
 
 styles:CSSProperties= {display:"flex",flexDirection:"column",height:"75vh",width:"60vw" ,justifyContent:"center",
alignItems:"center" ,backgroundColor:"orange"}


  state= {name:"",email:"",password:"",runfunc:false,display:false}
  handlec= (e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value}= e.target
    this.setState((prevState)=>{
      return {...prevState,[name]:value}
    })
  }
  
    
  handles= (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    //  const {name, value}= e.target
    
    this.setState({runfunc:true})
  }
  async componentDidUpdate(){
    if (this.state.runfunc) {
      const {name,email,password}= this.state

    const createuser:any = await client.mutate({mutation:CREATE_USER,variables:{ name,email,password},
    update:(cache:any,{data:createuser}:any)=>
    {let {users}:any = cache.readQuery({query:GET_USERS} ) || { users: [] }
    
    // console.log(users)
    cache.writeQuery({query:GET_USERS,
    data:{users:users.concat([createuser])}})}
    
    })
    

    // createuser(name,email,password)
    const{data}:any = await client.query({query:GET_USERS})
    console.log(data)
    let puser:any= data.getusers.find((item:any)=>item.email===email)
    console.log(puser)
    let id = puser.id
      localStorage.setItem("id",id)
    this.setState({name:"",email:"",password:"",display:true})
  return 
      
    }
  }

  
  render() {
    return (
        
      <div className="container">
        
        <form onSubmit={this.handles} style={this.styles} id="">
          {/* <h3>{this.props.word},</h3>
          <h3>{this.props.cred}</h3> */}
          <h3>sign up</h3>
      <input type="text" name="name" value={this.state.name} onChange={this.handlec}  placeholder="name"></input>
      <input type="text" name="email" value={this.state.email} onChange={this.handlec} placeholder="email"></input>
      <input type="password" name="password" value={this.state.password} onChange={this.handlec}  placeholder="password"></input>
      <button>submit</button>
      </form> 
      {this.state.runfunc && <Navigate to="/posts"/>}
      </div>
    )
  }
}

// const classcr= (props)=>{
//   const navigate= useNavigate()
//   return <Signup {...props}   navigate={navigate}/>
// }