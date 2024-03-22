import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const AdminResponsePage : React.FC<{message : MessageModel , submitResponse : any}> = (props) =>{

     const [displaywarning, setdisplayWarning] = useState(false)
     const [Response , setResponse] =useState('');

     function submitbtn(){
          if(props.message.id && Response!==""){
               props.submitResponse(props.message.id,Response)
               setdisplayWarning(false)
          }
          else{
               setdisplayWarning(true)
          }
          
     }
     
 
     return(
          <div className="card mt-2 shadow rounded p-3">
               <div className="card-header">
                    <h6>Case # {props.message.id}: {props.message.title}</h6>
                    <p>{props.message.userEmail}</p>
                    <p>{props.message.question}</p>   
               </div>
               <hr />
               <div className="card-body">
                    <h6>Response:</h6>
                    <form action="PUT">
                         {displaywarning &&
                         <div className="alert alert-danger" role="alert">
                              All fields must be filled
                         </div>}
                         <label htmlFor="response" className="form-label"> Description:</label>
                         <textarea rows={3} className="form-control" id="exampleFormControlTextarea1" 
                         onChange={(e)=>setResponse(e.target.value)} value={Response}/>
                         <div className="btn btn-primary" onClick={submitbtn}>Submit</div>

                    </form>
                    
               </div>
          </div>
     );

}