
import React, { Component, ChangeEvent, FormEvent ,CSSProperties} from 'react'
import {Navigate} from "react-router-dom"
import {client} from "./App"
import {LOG_USER} from "./apis"
interface Props{navigate:(path:string)=>any}
export default class Signup extends Component<Props> {
//  interface State {
//   name: string;
//   email: string;
//   password:string
// }
 styles:CSSProperties= {display:"flex",flexDirection:"column",height:"75vh" ,justifyContent:"center",
alignItems:"center", backgroundColor:"purple"}


  state= {name:"",email:"",password:"",runfunc:false,display:false}
  handlec= (e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value}= e.target
    this.setState({[name]:value})
  }
  handles= (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    //  const {name, value}= e.target
    this.setState( {runfunc:true})
    // console.log(this.state)
  }
  

     async componentDidUpdate(){
      if(this.state.runfunc) {
        
        const {name,email,password} = this.state

  // const [createpost]:any = useMutation(CREATE_POST,{variables:{comment},
  // update(cache,{data:ceatepost}){
  //   const {posts}:any= cache.readQuery({query:GET_POSTS})
  //   cache.writeQuery({query:GET_POSTS,
  //                     data:{posts:posts.concat([createpost])}})

const {data}= await client.query({query:LOG_USER,variables:{name,email,password}})
console.log(data)
 
    
     this.setState({name:"",email:"",password:"",display:true})
     this.props.navigate("/Posts")
   return     
      }

    }
    

  
  render() {
    
    return (
        
      <div>
      
        <form onSubmit={this.handles} style={this.styles} >
          <h3>Login</h3>
      <input type="text" name="name" value={this.state.name} onChange={this.handlec}  placeholder="name"></input>
      <input type="text" name="email" value={this.state.email} onChange={this.handlec} placeholder="email"></input>
      <input type="password" name="password" value={this.state.password} onChange={this.handlec}  placeholder="password"></input>
      <button>submit</button>
      </form>
       

      {/* {this.state.display&& this.props.navigate("/Posts")} */}
       </div>
    )
  }
}