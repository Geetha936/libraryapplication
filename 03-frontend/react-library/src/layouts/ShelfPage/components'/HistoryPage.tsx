import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { Link } from "react-router-dom";
import { Pagination } from "../../utils/paginstion";
import { SpinnerLoading } from "../../utils/Spinner";

export const HistoryPage = () =>{
     const {authState} = useOktaAuth();
     const [isLoadingHistory, setisloading] = useState(true);
     const [histories,sethistories] = useState<HistoryModel[]>([]);
     const [httpError,sethttpError] = useState(null);

     //Pagination
     const [currentPage , setCurrentpage] = useState(1);
     const [totalPages,settotalPages] = useState(0);

     useEffect(
          ()=>{
               const fetchHistory = async ()=>{
                    if(authState && authState.isAuthenticated){
                         const url :string=`${process.env.REACT_APP_API}/histories/search/findBooksByuserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage -1}&size=5`;
                         const historyresponse = await fetch(url);
                         if(!historyresponse.ok){
                              throw new Error("history gone wrong");
                         }
                         const historyjson = await historyresponse.json();
                         sethistories(historyjson._embedded.histories);
                         settotalPages(historyjson.page.totalPages);
                    }
                    setisloading(false);
               }
               fetchHistory().catch((error:any)=>{
                    sethttpError(error.message);
                    setisloading(false);
               })
          },[authState,currentPage]
     );
     if(isLoadingHistory){
          <SpinnerLoading/>
     }

     if(httpError){
          return(
               <div className="mt-5">
                    <p>{httpError}</p>
               </div>
          )
     }
     const paginate = (pageNumber : number) => setCurrentpage(pageNumber);
     return(
          <div className="mt-2">
               {histories.length > 0 ? 
               <>
               <h3>Recent History : </h3>
               {histories.map((history)=>(
                    <div key={history.id}>
                         <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                              <div className="row g-0">
                                   <div className="col-md-2">
                                        <div className="d-none d-lg-block" >
                                             {history.img?
                                             <img src= {history.img}alt="book" width='124' height="196" /> :
                                             <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width='124' height="196" />}
                                        </div>
                                        <div className="d-lg-none d-flex justify-content-center align-items-center"> 
                                             {history.img?
                                             <img src= {history.img}alt="book" width='124' height="196" /> :
                                             <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width='124' height="196" />}

                                        </div>
                                   </div>
                                   <div className="col">
                                        <div className="card-body">
                                             <h5 className="card-title">{history.author}</h5>
                                             <h4>{history.title}</h4>
                                             <p className="card-text">{history.description}</p>
                                             <p className="card-text">Checked On:{history.checkoutDate}</p>
                                             <p className="card-text">Returned On : {history.returnDate}</p>
                                             
                                        </div>
                                   </div>
                              </div>

                         </div>
                         <hr />
                    </div>
               ))}
               </>:
               <><h3 className="mt-3">Currently No History</h3>
               <Link to={"search"} className="btn btn-primary">Search FOr new Book</Link>
               </>}
               {totalPages>1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
          </div>
     );
}