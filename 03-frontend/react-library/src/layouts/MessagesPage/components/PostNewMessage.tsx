import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const PostNewMessage =  () =>{
     const {authState} = useOktaAuth();
     // const [newmessage , setnewmessage] = useState<MessageModel>();
     const [title, settitle] = useState("");
     const [question,setquestion] =useState('');
     const [warning , setwarning] = useState(false);
     const [displaySuccess , setdisplaySuccess] = useState(false)
     const [httpError , sethttpError] = useState(null)

     async function submitNewQuestion(){
          const url=`${process.env.REACT_APP_API}/messages/secure/add/message`;
          if(authState?.isAuthenticated && title!=='' && question!==''){
               const messageRequestModel : MessageModel = new MessageModel(title,question);
               const requestOptions = {
                    method : "POST"
                    , headers : {
                         Authorization : `Bearer ${authState.accessToken?.accessToken}`,
                         'Content-Type' : 'application/json'
                    },body : JSON.stringify(messageRequestModel)
               };
               const responseUrl = await fetch(url,requestOptions);
               if(!responseUrl.ok){
                    throw new Error("subNewWuestion gone Wrong")
               }
               settitle('');
               setquestion('');
               setwarning(false);
               setdisplaySuccess(true)
          }else{
               setwarning(true);
          }
     }
     return(
          <div className="card mt-3 ">
               
               <div className="card-header">Ask question to Luv@code admin</div>

               <div className="card-body">
                    <form method="POST">

               {warning && 
               <div className="alert alert-danger" role="alert">
                    All fileds must be filled
               </div> }
               {displaySuccess && 
               <div className="alert alert-success" role="alert">
                    Qeustion added successfully
               </div> }

               <div className="mb-3">
                    <label  className="form-label mb-3">Title</label>
                    <input type="text" className="form-control" placeholder="Title" value={title} id="exampleFormControlInput1" onChange={(e)=>settitle(e.target.value) }/>
               </div>

               <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <textarea rows={3} className="form-control" id="'exampleFormCOntrolTextarea1"  value={question} onChange={(e)=>setquestion(e.target.value)} ></textarea>
               </div>
               <button className="btn btn-primary mt-3" type="button" onClick={()=>submitNewQuestion()}> Sunmit Question</button>
               </form>
               </div>
               
          </div>
     );
}