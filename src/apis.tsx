import {gql} from "@apollo/client"

const CREATE_USER= gql`mutation createuser($name:String!,
$email:String!,$password:String!){createuser(
    name:$name, email:$email,password:$password
){id
    name
    email
    password
}}`

const CREATE_POST= gql`mutation createpost($comment:String!,$postid:Int!){createpost(
    comment:$comment, postid:$postid
){
    comment
}}`

const GET_USERS= gql`query getusers{getusers{id
name
email
password}}`

const GET_POSTS= gql`
query getposts{getposts{comment}}`

const LOG_USER= gql`query loguser($name:String!,
$email:String!,$password:String!){loguser( name:$name, email:$email,password:$password){name}}`


export{CREATE_USER,CREATE_POST, GET_USERS, GET_POSTS, LOG_USER}