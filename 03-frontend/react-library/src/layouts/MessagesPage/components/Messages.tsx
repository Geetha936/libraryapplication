import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../utils/Spinner";
import { Pagination } from "../../utils/paginstion";

export const Messages = () =>{
     const {authState} = useOktaAuth();
     const [messages,setmessages] = useState<MessageModel[]>([]);
     const [isloading , setisloading] =useState(true);
     const [httpError , sethttpError] = useState(null);
     
     //Paginatioin'
     const [currentPage ,setcurrentpage] = useState(1);
     const [Messagesperpage] = useState(5);
     const [totalPages ,settotalpages] = useState(0);

     useEffect( ()=>{
         const fetchmessages = async () =>{
          if(authState && authState?.isAuthenticated){
               const url = `${process.env.REACT_APP_API}/messages/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage -1}&size=${Messagesperpage}`;
               const requestOptions = {
                    method : 'GET',
                    headers :{ Authorization : `Bearer ${authState.accessToken?.accessToken}`
                    , 'Content-Type' :'application/json'}
               }
               const resonseurl = await fetch(url , requestOptions);
               if(!resonseurl.ok){
                    throw new Error("Fetching Messages Gone Wrong");
               }
               const messagesjson = await resonseurl.json();
               setmessages(messagesjson._embedded.messages);
               settotalpages(messagesjson.page.totalPages);
               }
               setisloading(false);    
          }
          fetchmessages().catch((error : any) =>{
               setisloading(false);
               sethttpError(error.message)
          })
          window.scrollTo(0,0);
     }, [authState,currentPage]);

     if(isloading){
     
               <SpinnerLoading/>
         
     }
     if(httpError){
          <div className=" container mt-3">
               <p>{httpError}</p>
          </div>
     }
     const paginate = (pageNumber : number) => setcurrentpage(pageNumber);
     return(
          <div className="mt-2">
               {messages.length > 0 ? <>
               <h5>Current Q/A:</h5>
               {messages.map(message =>(
                    <div key={message.id}>
                         <div className="card mt-2 shadow p-3 bg-body rounded">
                              <h5>Case #{message.id} : {message.title}</h5> 
                              <h6>{message.userEmail}</h6>
                              <p>{message.question}</p>
                              <hr />
                              <div>
                                   <h5>Responses:</h5>
                                   {message.response &&  message.adminEmail ? <>
                                   <h6>{message.adminEmail} (admin)</h6>
                                   <p>{message.response}</p>
                                   </>:
                                   <><p>Pending response from administration, Please be patient</p></>}</div></div>
                    </div>
               ))}
               </> :<><h5>All questions you submit will be shown here</h5></>}

               {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
               

          </div>
     );

}