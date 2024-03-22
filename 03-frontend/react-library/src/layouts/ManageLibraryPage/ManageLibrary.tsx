import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import AddBook from "../../models/AddBook";
import { AddnewBook } from "./components/AddNewBook";
import { ChangeQuamtity } from "./components/ChangeQuantity";

export  const ManageLibrary = () =>{
     const {authState} = useOktaAuth();

     const [changeQuantityOfBooksClick , setchangeQuantityOfBooksClick] = useState(false);
     const [messagesClick , setmessagesclick] =useState(false);

     function addBookClickFunction(){
          setchangeQuantityOfBooksClick(false);
          setmessagesclick(false);
     }

     function changeQuantityOfBooksClickFunvtion(){

          setchangeQuantityOfBooksClick(true);
          setmessagesclick(false);
     }
     function messagesClickFunction(){
          setchangeQuantityOfBooksClick(false);
          setmessagesclick(true);
     }
     if(authState?.accessToken?.claims.userType===undefined){
          return <Redirect to={'/home'}/>
     }
     return(
          <div className="container">
               <div className="mt-5 mb-2">
                    <h3>Manage Library</h3>
                    <nav>
                         <div className="nav nav-tabs" role="tablist" id="nav-tab">
                              <button className="nav-link active" id="nav-add-book-tab" role="tab" type="button"
                              data-bs-target="#nav-add-book" aria-selected="false" aria-controls="nav-add-book"
                              data-bs-toggle="tab" onClick={addBookClickFunction}>
                                   Add new book     
                              </button>
                              <button className="nav-link" role="tab" type="button" data-bs-target="#nav-quantity" aria-selected="true"
                              data-bs-toggle="tab" id="nav-quantity-tab" aria-controls="nav-quantity" onClick={changeQuantityOfBooksClickFunvtion}>
                                   change Quantity
                              </button>
                              <button className="nav-link" role="tab" type="button" data-bs-target="#nav-messages" aria-selected="false"
                              data-bs-toggle="tab" id="nav-messages-tab"  aria-controls="nav-messages " onClick={messagesClickFunction}> 
                                   messages
                              </button>
                         </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                         <div className="tab-pane show active fade" id="nav-add-book" role="tabpanel" aria-labelledby="nav-add-book-tab">
                         <AddnewBook/>
                         </div>
                         <div className="tab-pane fade" aria-labelledby="nav-quantity-tab" id="nav-quantity" role="tabpanel">
                              {changeQuantityOfBooksClick ? <ChangeQuamtity/>:<></>}
                         </div>
                         <div className="tab-pane fade" aria-aria-labelledby="nav-messages-tab" id="nav-messages" role="tabpanel">
                              {messagesClick ? <AdminMessages/> : <></>}
                         </div>
                         
                    </div>
               </div>

          </div>
     );
}