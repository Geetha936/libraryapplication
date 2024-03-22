import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel"
import { SpinnerLoading } from "../../utils/Spinner";
import { Pagination } from "../../utils/paginstion";
import { QuantityChange } from "./QuantityChange";

export const ChangeQuamtity = () =>{

     const [books,setBooks] = useState<BookModel[]>([]);
     const [isLoading,setIsloadiing] =useState(true);
     const [httpError,sethttpError] = useState(null);
     const [currentPage,setCurrentPAge]=useState(1);
     const [booksPerPage] =useState(5);
     const [totalAmountofBooks,settotalAmountofBooks]=useState(0);
     const [totalPages,settoalpages]=useState(0);
     const [Deletebook , setdeletebook] = useState(false);

     useEffect(()=>{
          const fetchBooks = async () =>{
               const url = `${process.env.REACT_APP_API}/books?page=${currentPage-1}&size=${booksPerPage}`;

               const response = await fetch(url);

               if(!response.ok){
                    throw new Error("Someting went wromg")
               }

               const responseJson = await response.json();

               const responsedData = responseJson._embedded.books;

               settotalAmountofBooks(responseJson.page.totalElements);
               settoalpages(responseJson.page.totalPages);

               const loadedBooks : BookModel[] = [];

               for(const key in responsedData){
                    loadedBooks.push({
                         id:responsedData[key].id,
                         title:responsedData[key].title,
                         author:responsedData[key].author,
                         description:responsedData[key].description,
                         copies:responsedData[key].copies,
                         copiesAvailable:responsedData[key].copiesavailable,
                         category:responsedData[key].category,
                         img:responsedData[key].img
                    })
               }
               setBooks(loadedBooks);
               setIsloadiing(false);

          };
          fetchBooks().catch((error : any)=>{
               sethttpError(error);
               setIsloadiing(false);
          } )
     },[currentPage , Deletebook])
     const indexOFLastBook:number =currentPage * booksPerPage;
     const indexOfFirstBook:number=indexOFLastBook -booksPerPage;
     let lastItem=booksPerPage* currentPage<=totalAmountofBooks ? booksPerPage*currentPage : totalAmountofBooks;
     
     const paginate=(pageNumber:number)=>setCurrentPAge(pageNumber);

     if(isLoading){
          return(<SpinnerLoading/>)     
     }
     if(httpError){
          return(
               <div className="mt-2">
                    <p>{httpError}</p>
               </div>
          )
     }
     console.log(books)
     
     const deletebook =() =>
     setdeletebook(!Deletebook);

     return(
          <div className="container mt-4">
               {totalAmountofBooks > 0 ?
               <> <div className="mt-3">
                    <h3>Number Of books: ({totalAmountofBooks})</h3></div>

                    <p>
                         {indexOfFirstBook + 1 } to {lastItem} of {totalAmountofBooks} items
                    </p>
                    {books.map(book =>(
                         <QuantityChange book={book} key={book.id} deletebook={deletebook} />
                    ))}
               </>

               :
               <> <h5>Add a Book before Changing quantity</h5></>}

               {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
          
     </div>
     );

     
}