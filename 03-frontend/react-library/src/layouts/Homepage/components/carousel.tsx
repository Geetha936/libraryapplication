import { ReturnBook } from "./returnbook";
import { useEffect,useState } from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";
import { SpinnerLoading } from "../../utils/Spinner";
import { Link } from "react-router-dom";


export const Carousel = () => {

    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsloadiing] =useState(true);
    const [httpError,sethttpError] = useState(null);
 
    useEffect(()=>{
        const fetchBooks =async()=>{
            const baseurl:string = "http://localhost:8080/api/books"
            const url:string = `${baseurl}?page=0&size=9`;
            const response = await fetch(url);
            if (!response.ok){
                throw new Error ('something is wrong');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
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

    },[]);

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





    return (
        <div className="container mt-5" style={{height:550}}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late reading " book</h3>
            </div>
            <div id='carouselExampleControls' className="carousel carousel-dark slide mt-5 d-none  d-lg-block" data-bs-interval='false'>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0,3).map(book=>(
                                <ReturnBook Book={book} key={book.id}/>
                            ))}                                                              
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        {books.slice(3,6).map(book=>(
                                <ReturnBook Book={book} key={book.id}/>
                            ))}                   
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        {books.slice(6,9).map(book=>(
                                <ReturnBook Book={book} key={book.id}/>
                            ))}                    
                        </div>
                    </div>
                </div>
                    <button className="carousel-control-prev" type='button'
                     data-bs-target="#carouselExampleControls" data-bs-slide='prev'>
                        <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                        <span className="visually-hidden">previous</span>
                    </button>

                    <button className="carousel-control-next" type='button'
                     data-bs-target="#carouselExampleControls" data-bs-slide='next'>
                        <span className="carousel-control-next-icon" aria-hidden='true'></span>
                        <span className="visually-hidden">Next</span>
                    </button>
            </div>
                <div className="d-lg-none mt-3">
                    <div className="row d-flex justify-content-center align-items-center">                          
                        <ReturnBook Book={books[7]} key={books[7].id}/>
                    </div>                     
                </div>
                <div className="homepage-carousel-title mt-3">
                    <Link className="btn btn-outline-secondary d-lg" to="/search">View More</Link>

                </div>

        </div>
       

    )
};