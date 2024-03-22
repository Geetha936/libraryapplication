import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../utils/Spinner";
import { Link } from "react-router-dom";
import LoansModal from "./LoansModal";

export const Loans =() =>{
     const {authState} = useOktaAuth();
     const [isloading,setisloading] = useState(true);
     const [currentloans,setcurrentloans] = useState<ShelfCurrentLoans[]>([]);
     const [httpError,sethttpError] = useState(null);

     const [checkout, setCheckout] = useState(false);
     const [renewLoan , setrenewLoan] = useState(false);

     useEffect(()=>{
          const fetchcurrentloans =async () => {
               if(authState && authState.isAuthenticated){
               const url :string = `${process.env.REACT_APP_API}/books/secure/currentloans`;
               const responseOptions = {
                    method : 'GET',
                    headers : {
                         Authorization : `Bearer ${authState.accessToken?.accessToken}`,
                         'Content-Type' : 'application/json'
                    }
               };
               const response = await fetch(url,responseOptions);
               if(!response.ok){
                    throw new Error("fetchcurrentloans gone wrong");
               }
               const responsejson = await response.json();
               setcurrentloans(responsejson);
               
          }
          setisloading(false);
     };
     setCheckout(false)
     setrenewLoan(false)
          fetchcurrentloans().catch((error : any)=>{
               sethttpError(error.message);
               setisloading(false);
          })
     },[authState,checkout,renewLoan]);
     if(isloading){
          return(
              <SpinnerLoading/>
          )
      }
      if(httpError){
          return(
              <div className="container mt-5">
                  <p>{httpError}</p>
              </div>
              )
  
      }
      async function returnBook(bookId: number) {
          const url = `${process.env.REACT_APP_API}/books/secure/return?bookId=${bookId}`;
          const requestOptions ={
               method : 'PUT',
               headers : {
                    Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type' : 'application/json'
               }
          };
          const returnresponse = await fetch(url,requestOptions);
          if(!returnresponse.ok){
               throw new Error('return Book gone wromg')
          }
          setCheckout(true);
          
      }

      async function renewBookLoan(bookId : number){
          const url = `${process.env.REACT_APP_API}/books/secure/renew?bookId=${bookId}`;
          const requestOptions ={
               method : 'PUT',
               headers : {
                    Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type' : 'application/json'
               }
          };
          const responseUrl =await fetch(url,requestOptions);
          if(!responseUrl.ok){
               throw new Error("renewBookLoan gone wrong");
          }
          setrenewLoan(true);
      }
      

     return(
          <div>
               {/*desktop  */}
               <div className="d-none d-lg-block mt-2">
                    
                    {currentloans.length>0 ?
                    <>
                    <h5>Current Loans:</h5>
                    {currentloans.map(currentloan => ( 
                        <div key={currentloan.book.id}>
                              <div className="row mt-3 mb-3">
                                   <div className="col-4 col-md-4 container">
                                        {currentloan.book?.img ?
                                        <img src={currentloan.book?.img} width='226' height ='349' alt ="book"/> :
                                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} alt="book" /> }
                                   </div> 
                                   <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                             <div className="mt-3">
                                                  <h4>Loan Options</h4>
                                                  {currentloan.daysLeft >0 && 
                                                  <p className="text-secondary"> Due in {currentloan.daysLeft}</p>
                                                  }
                                                  {currentloan.daysLeft===0 && 
                                                  <p className="text-success">Due Today</p>
                                                  }
                                                  {currentloan.daysLeft<0 &&
                                                    <p className="text-danger">
                                                       Past Due by {currentloan.daysLeft} days
                                                    </p>
                                                  }
                                                  <div className="list-group mt-3">
                                                       <button className="list-group-item list-group-item-action"
                                                       aria-current="true" data-bs-toggle="modal" data-bs-target={`#modal${currentloan.book.id}`}>Manage Loan

                                                       </button>
                                                       <Link to={"search"} className="list-group-item list-group-item-action" >Search More Books</Link>

                                                  </div>
                                             </div>
                                             <hr />
                                             <p className="mt-3">
                                                  Help Others find their Adventure By reviering your loan
                                             </p>
                                             <Link to={`/checkout/${currentloan.book.id}`} className="btn btn-primary">Leave a review</Link>
                                        </div>
                                        

                                   </div>
                                   <hr />
                                   <LoansModal shelfCurrentloan={currentloan} mobile={false} returnBook={returnBook} renewBookLoan={renewBookLoan} />

                              </div>
                         </div>
                    ))}
                    </>
                    :
                    <>
                    <h3 className="mt-3">Currently No Loans</h3>
                    <Link to={'search'} className="btn btn-primary">Search New Book</Link>
                    </>}

               </div>

               {/* mobile */}
               <div className="container d-lg-none mt-2">
                    
                    {currentloans.length>0 ?
                    <>
                    <h5 className="mb-3">Current Loans:</h5>
                    {currentloans.map(currentloan => ( 
                        <div key={currentloan.book.id}>      
                                   <div className="d-flex justify-content-center align-items-center">
                                        {currentloan.book?.img ?
                                        <img src={currentloan.book?.img} width='226' height ='349' alt ="book"/> :
                                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} alt="book" /> }
                                   </div>
                                   <div className="card d-flex mt-5 mb-3">
                                        <div className="card-body container">
                                             <div className="mt-3">
                                                  <h4>Loan Options
                                                  </h4>
                                                  {currentloan.daysLeft> 0 && 
                                                  <p className="text-secondary">Due in {currentloan.daysLeft}</p>
                                                  }
                                                  {currentloan.daysLeft===0 && 
                                                  <p className="text-success">Due Today</p>
                                                  }
                                                  {currentloan.daysLeft<0 &&
                                                    <p className="text-danger">
                                                       Past Due by {currentloan.daysLeft} days
                                                    </p>
                                                  
                                                  }
                                                  <div className="list-group mt-3">
                                                       <button className="list-group-item list-group-item-action"
                                                       aria-current="true" data-bs-toggle="modal" data-bs-target={`#mobilemodal${currentloan.book.id}`}>Manage Loan

                                                       </button>
                                                       <Link to={"search"} className="list-group-item list-group-item-action" >Search More Books</Link>

                                                  </div>
                                             </div>
                                             <hr />
                                             <p className="mt-3">
                                                  Help Others find their Adventure By reviering your loan
                                             </p>
                                             <Link to={`/checkout/${currentloan.book.id}`} className="btn btn-primary">Leave a review</Link>
                                        </div>

                                   </div>
                                   <hr />
                                   

                                   <LoansModal shelfCurrentloan={currentloan} mobile={true} returnBook={returnBook} renewBookLoan={renewBookLoan}/>
                         </div>
                    ))}
                    </>
                    :
                    <>
                    <h3 className="mt-3">Currently No Loans</h3>
                    <Link to={'search'} className="btn btn-primary">Search New Book</Link>
                    </>}

               </div>
          </div>

          
     );
}
export default Loans;