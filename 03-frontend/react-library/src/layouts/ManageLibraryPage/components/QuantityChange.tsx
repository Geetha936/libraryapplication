import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";

export const QuantityChange :React.FC<{book : BookModel , deletebook : any }> = (props)=>{
     const {authState} = useOktaAuth();
     const [quanity , setQuantity] =useState<number>(0)
     const [booksRemaing  , setBooksReamianing]= useState<number>(0)

     useEffect(()=>{
          const fetchdetails = () =>{
               props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
               props.book.copiesAvailable ? setBooksReamianing(props.book.copiesAvailable) :setBooksReamianing(0);
          };
          fetchdetails();
          },[])
     
      async function IncreaseQuantity(){
          const url =   `${process.env.REACT_APP_API}/admin/secure/increase/book/quantity?bookId=${props.book.id}`
          const requestOptions = {
               method : "PUT",
               headers : {
                    Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
               }
          }
          const responseurl =  await fetch(url , requestOptions);
          if(!responseurl.ok){
               throw new Error("Increase Quantity gone wrong");
          }
          setBooksReamianing(booksRemaing +1);
          setQuantity(quanity +1);
      } 
      async function decreaseQuantity(){
          const url =   `${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity?bookId=${props.book.id}`
          const requestOptions = {
               method : "PUT",
               headers : {
                    Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
               }
          }
          const responseurl =  await fetch(url , requestOptions);
          if(!responseurl.ok){
               throw new Error("decrease Quantity gone wrong");
          }
          setBooksReamianing(booksRemaing -1);
          setQuantity(quanity -1);
      } 
      async function deletebook(){
          const url =   `${process.env.REACT_APP_API}/admin/secure/delete/book?bookId=${props.book.id}`
          const requestOptions = {
               method : "DELETE",
               headers : {
                    Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
               }
          }
          const responseurl =  await fetch(url , requestOptions);
          if(!responseurl.ok){
               throw new Error("delete gone wrong");
          }
          props.deletebook();
      } 
     
     return(
          <div className="card shadow p-2 bg-body mt-2">
                    <div className="row">
                         <div className="col-md-2">
                              <div className="d-none d-lg-block">
                              {props.book.img ?
                              <img src={props.book.img} alt="book"  height={196} width={125}/> :
                              <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width={123} height={196}/> }

                              </div>
                              <div className="d-lg-none d-flex justify-content-center align-items-center">
                                   {props.book.img ?
                                   <img src={props.book.img} alt="book"  height={196} width={125}/> :
                                   <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width={123} height={196}/> }
                              </div>     
                         </div>
                         <div className="col-md-5">
                              <div className="card-body">
                                   <h5 className="card-title">{props.book.author}</h5>
                                   <h4>{props.book.title}</h4>
                                   <p className="card-text">{props.book.description}</p>
                              </div>
                              
                         </div>
                         <div className="mt-3 col-md-4">
                                   <div className="d-flex justify-content-center align-items-center">
                                   <p>Total Quantity : <b>{quanity}</b></p>
                                   </div>
                              <div className="d-flex justify-content-center align-items-center">
                                   <p>Books Remaining : <b>{booksRemaing}</b></p>
                              </div>
                         
                              </div>
                         
                         <div className="mt-3" >
                              <div className="d-flex justify-content-start">
                                   <button className="m-1 btn btn-md btn-danger" onClick={deletebook}> Delete</button>
                              </div>
                         </div>

                         
                         <button className="btn btn-primary text-white" type="button" onClick={IncreaseQuantity}> Increase Quantity</button>
                         <button className="btn btn-warning text-white" onClick={decreaseQuantity}> decrease Quantity</button>
                         
                         </div>
                    
               </div>
     );
}