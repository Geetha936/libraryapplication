import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/Spinner";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../utils/paginstion";

export const SearchBooksPage= () =>{
    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsloadiing] =useState(true);
    const [httpError,sethttpError] = useState(null);
    const [currentPage,setCurrentPAge]=useState(1);
    const [booksPerPage] =useState(5);
    const [totalAmountofBooks,settotalAmountofBooks]=useState(0);
    const [totalPages,settoalpages]=useState(0);
    const [search,setSearch]=useState("");
    const [searchurl,setSearchUrl]=useState('');
    const [category,setcategory] =useState('Category')
 
    useEffect(()=>{
        const fetchBooks =async()=>{
            const baseurl:string = "http://localhost:8080/api/books"
            let url:string ="";
            if(searchurl===''){
                url=`${baseurl}?page=${currentPage-1}&size=${booksPerPage}`;
            }else{
                url=baseurl +searchurl;
            }
             
            const response = await fetch(url);
            if (!response.ok){
                throw new Error ('something is wrong');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            settotalAmountofBooks(responseJson.page.totalElements);
            settoalpages(responseJson.page.totalPages)
            const lodedBooks: BookModel[] =[];
           
            for(const key in responseData){
                lodedBooks.push({
                    id:responseData[key].id,
                    author : responseData[key].author,
                    title : responseData[key].title,
                    description: responseData[key].description,
                    copies:responseData[key].copies,
                    copiesAvailable : responseData[key].copiesAvailable,
                    category:responseData[key].category,
                    img : responseData[key].img

                })
               
            }
            setBooks(lodedBooks);
            setIsloadiing(false);

        };
        fetchBooks().catch((error:any)=>{
            setIsloadiing(false);
            sethttpError(error.message);
        })
        window.scrollTo(0,0);

    },[currentPage,searchurl]);

    if(isLoading){
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
    const searchHandleChange=()=>{
        setCurrentPAge(1);
        if(search===''){
            setSearchUrl('');

        }else{
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setcategory('Category')
    }
    const categoryHandleChange = (value:string) =>{
        setCurrentPAge(1)
        if(value==='All'){
            setcategory('All');
            setSearchUrl(``);

        }else{
        setcategory(value);
        setSearchUrl(`/search/findByCategoryContaining?category=${value}&page=<pageNumber>&size=${booksPerPage}`);}

    }
    const indexOFLastBook:number =currentPage * booksPerPage;
    const indexOfFirstBook:number=indexOFLastBook -booksPerPage;
    let lastItem=booksPerPage* currentPage<=totalAmountofBooks ? booksPerPage*currentPage : totalAmountofBooks;
    
    const paginate=(pageNumber:number)=>setCurrentPAge(pageNumber);
    return(
        <div >
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                            <input type="search" className="form-control me-2" placeholder="Search" aria-labelledby="Search"
                            onChange={e=>setSearch(e.target.value)}/>
                            <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" 
                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{category}</button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={()=>categoryHandleChange('All')}>
                                        <a className="dropdown-item" href="#" >All</a>
                                    </li>
                                    <li onClick={()=>categoryHandleChange('FE')}>
                                        <a href="#" className="dropdown-item" >Front-ENd</a>
                                    </li>
                                    <li onClick={()=>categoryHandleChange('BE')}>
                                        <a href="#" className="dropdown-item" >Back-end</a>
                                    </li>
                                    <li onClick={()=>categoryHandleChange('DATA')}>
                                        <a href="#" className="dropdown-item" >Data</a>
                                    </li>
                                    <li onClick={()=>categoryHandleChange('DevOps')}>
                                        <a href="#" className="dropdown-item" >Dev-ops</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        {totalAmountofBooks>0?<>
                       <div className="mt-3">
                        <h5>Number of results: ({totalAmountofBooks})</h5></div>
                        <p> {indexOfFirstBook +1} to {lastItem} of {totalAmountofBooks} items:</p> 
                        {books.map(book => (
                            <SearchBook Book={book} key={book.id}/>
                        ))}</>:
                        <div className="mt-5">
                            <h3>Cant find what you want?</h3>
                            <a href="#" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Library Services</a>

                        </div>
                        }
                    {totalPages>1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
                </div>
            </div>
        </div>
    );
}