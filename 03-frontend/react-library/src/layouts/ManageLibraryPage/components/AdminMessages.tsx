import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../utils/Spinner";
import { Pagination } from "../../utils/paginstion";
import AdminResponse from "../../../models/AdminResponse";
import { AdminResponsePage } from "../../MessagesPage/components/AdminResponsePage";

export const AdminMessages = ( )=>{
     const {authState} =useOktaAuth();

     const [islading, setisloading] = useState(true);
     const [httpError , sethttpError] = useState(null);

     const [adminmessages , setadminmessages] = useState<MessageModel[]>([]);
     const [messagesperpage ] = useState(5)

     const [currentpage , setcurrentpage ] =useState(1);
     const [totalpages,settotalpages] = useState(0);

     const [btnsubmit , setButtonasublit] =useState(false)

     useEffect( ()=>{
          const fetchUserMessages = async () =>{
               if(authState && authState.isAuthenticated){
                    const url = `${process.env.REACT_APP_API}/messages/search/findByClosed?closed=false&page=${currentpage-1}&size=${messagesperpage}`;
                    const requestOptions ={
                         method : 'GET',
                         Headers : {
                              Authorization : `Bearer ${authState.accessToken?.accessToken}`,
                              'Content-Type' : 'application/json'
                         }
                    };
                    const resonse = await fetch(url,requestOptions);
                    if(!resonse.ok){
                         throw new Error("feching user messges gone wrong")
                    }
                    const responsejson =await resonse.json();
                    setadminmessages(responsejson._embedded.messages);
                    settotalpages(responsejson.page.totalpages)
          }setisloading(false) 
          }
          fetchUserMessages().catch((error : any) =>{
               setisloading(false)
               sethttpError(error.message)})
          window.scrollTo(0,0);
     },[authState,currentpage , btnsubmit]);
     
     if(islading){
          return <SpinnerLoading/>
     }
     if(httpError){
          <div className="mt-3">
               <p>{httpError}</p>
          </div>
     }

     async function  submitAdminResponse(id:number,response : string) {
          const url = `${process.env.REACT_APP_API}/messages/secure/admin/response`;

          const adminresponse : AdminResponse = new AdminResponse(id,response);
          if(authState && authState.isAuthenticated && id!=null && response!=""){
               const requestOptions = {
                    method : "PUT",
                    headers :{
                    Authorization :   `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type" : 'application/json' },
                    body :JSON.stringify(adminresponse)
               }
               const responseurl = await fetch(url , requestOptions);
               if(!responseurl.ok){
                    throw new Error("Admin Resoponse function gone wrong")
               }
               setButtonasublit(!btnsubmit);
          }
          
     }

     const paginate = (pageNumber : number ) => setcurrentpage(pageNumber);
     console.log(adminmessages)
     return (
          <div className="mt-3">
               {adminmessages.length >0 ? <>
               <h3>Pending Q/A</h3>
               {adminmessages.map(message => (
                    <div key={message.id}>
                         <AdminResponsePage message={message} submitResponse={submitAdminResponse}/>
                    </div>
              ) )}
               
               </> :
               <h5>No pending questions</h5>
               }

               {totalpages > 0 && <Pagination currentPage={currentpage} totalPages={totalpages} paginate={paginate} /> }

          </div>
     );
}