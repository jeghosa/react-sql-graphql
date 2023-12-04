
import React, { Component, ChangeEvent, FormEvent } from 'react'
import {CREATE_POST,GET_USERS,GET_POSTS} from "./apis"
// import {useMutation,useQuery} from "@apollo/client"
import {Link } from "react-router-dom" 
import {client}  from "./App"
// import Login from "./Login"


export default class Posts extends Component {
    state= {postid:0,comment:"",runfunc:false}
    
  handlec= (e:any)=>{
    const {name, value}= e.target
    // this.setState((prevState)=>{
    //   return {...prevState,[name]:value}})
    this.setState({[name]:value})
  }
   
   
  handles= (e:any)=>{
    e.preventDefault()
    let id:any=  localStorage.getItem("id")
    id= parseInt(id)
        this.setState({runfunc:true,postid:id})

  }

  async componentDidUpdate(){
      if (this.state.runfunc) {
        
        const {postid,comment} = this.state

  // const [createpost]:any = useMutation(CREATE_POST,{variables:{comment},
  // update(cache,{data:ceatepost}){
  //   const {posts}:any= cache.readQuery({query:GET_POSTS})
  //   cache.writeQuery({query:GET_POSTS,
  //                     data:{posts:posts.concat([createpost])}})

  let createpost:any = await client.mutate({mutation:CREATE_POST,variables:{postid,comment},
  update:(cache,{data:createpost})=>{
    let {posts}:any= cache.readQuery({query:GET_POSTS}) || {posts:[]}
    cache.writeQuery({query:GET_POSTS,
                      data:{posts:posts.concat([createpost])}})
                      console.log(posts)


  }})
      //  createpost(postid,comment)
    
    this.setState({runfunc:false,comment:""})
   return     
      }

    }
    

  render() {
    return (
      <div>
        <Link to="/Login">Logout</Link>
        <form onSubmit={this.handles} >
          
        <textarea name="comment" id="" onChange={this.handlec}  placeholder='comment' value={this.state.comment}></textarea>
        <button>submit</button>
      </form> 
      </div>
    )
  }
}
