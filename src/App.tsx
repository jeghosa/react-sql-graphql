import React, { Component} from 'react'
import {BrowserRouter as Router,Routes,Route,useNavigate } from "react-router-dom"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import Signup from "./Signup"
import Login from "./Login"
import Posts from "./Posts"
import Wrapper from './Wrapper'

export const client= new ApolloClient({uri:"http://localhost:4000/graphql",
cache:new InMemoryCache({typePolicies:
  {Query:{fields
:{users:{merge(existing,incoming){return incoming}},
posts:{merge(existing,incoming){return incoming}}}}}})})
 
//  export default class App extends Component {
//   state:any={word:"hello"}
//    render() {
//      return (
//       <ApolloProvider client={client}>
//       <Router>
//         <Routes> 
//         <Route path="/" element={<Signup {...this.state} cred={"welcome!"}/>}>
//         </Route> 
//         <Route path="/Posts" element={<Posts/>}>
//         </Route> 
//         <Route path="/Login" element={<Login/>}>
//         </Route> 
//        </Routes>
//      </Router>
//      </ApolloProvider>
//      )
//    }
//  }
 


// import React from 'react'
 
 export default function App() {
  const navigate:any= useNavigate()
   return (
      <ApolloProvider client={client}>
      {/* <Router> */}
        <Routes> 
        <Route path="/" element={<Signup />}>
        </Route> 
        <Route path="/Posts" element={<Posts/>}>
        </Route> 
        <Route path="/Login" element={<Wrapper>{(navigate:any)=><Login navigate={navigate} />}</Wrapper>}>
        </Route> 
       </Routes>
     {/* </Router> */}
     </ApolloProvider>
     )
 }
 