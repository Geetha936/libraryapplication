import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../utils/Spinner";
import { Checkbook } from "./components/checkbook";
import { Star } from "../utils/Stars";
import { LatestReviews } from "./components/LatestReview";
import { useOktaAuth } from "@okta/okta-react";

export const BookCheckoutpage =()=>{

    const {authState} = useOktaAuth();

    const [books,setBooks] = useState<BookModel>();
    const [isLoading,setIsloadiing] = useState(true);
    const [httpError,sethttpError] = useState(null);

    //review
    const [bookReview,setBookReview] =useState<ReviewModel[]>([]);
    const [starrating,setRating] = useState(0);
    const [reviewloding , setreviewLoading] = useState(true);

    //loans
    const [currentLoansCount,setCurrentLoansCount]=useState(0);
    const [isLoadingCurrentLoansCount,setIsloadiingCurrentLoansCount] = useState(true);

    //ischeckout
    const [ischecked,setisheckedout] = useState(false)
    const [isloadingbookcheckedout, setisloadingbookchekedout] = useState(true)

    const bookid =(window.location.pathname).split('/')[2];
    useEffect(()=>{
        const fetchBooks =async()=>{
            const baseurl:string = `http://localhost:8080/api/books/${bookid}`;
            const response = await fetch(baseurl);
            if (!response.ok){
                throw new Error ('something is wrong');
            }

            const responseJson = await response.json();
            const lodedBooks: BookModel ={
                   id:responseJson.id,
                    author : responseJson.author,
                    title : responseJson.title,
                    description: responseJson.description,
                    copies:responseJson.copies,
                    copiesAvailable : responseJson.copiesavailable,
                    category:responseJson.category,
                    img : responseJson.img}
            setBooks(lodedBooks);
            setIsloadiing(false);

        };
        fetchBooks().catch((error:any)=>{
            setIsloadiing(false);
            sethttpError(error.message);
        })

    },[chekoutbook]);

    useEffect(()=>{
        const fetchReviews= async () =>{
            const reviewUrl : string =   `http://localhost:8080/api/reviews/search/findReviewByBookId?bookId=${bookid}`;
            const responseReviw = await fetch(reviewUrl);
            if(!responseReviw.ok){
                throw new Error("something went wrong")
            }
            const reviewJson = await responseReviw.json();
            const reviewData = reviewJson._embedded.reviews;
            const loadedReview: ReviewModel[]= []; 
            let weightedRating: number =0;
            for(const key in reviewData)
            {
                loadedReview.push({
                    id : reviewData[key].id,
                    userEmail : reviewData[key].userEmail,
                    rating : reviewData[key].rating,
                    book_id : reviewData[key].bookId,
                    date : reviewData[key].date,
                    reviewDescription : reviewData[key].reviewDescription


                })
                weightedRating = weightedRating+ reviewData[key].rating;
            }
            if(loadedReview){
                const round= (Math.round((weightedRating/loadedReview.length)*2)/2).toFixed(1);
                setRating(Number(round));
            }
            setBookReview(loadedReview);
            setreviewLoading(false);

        };
        fetchReviews().catch((error :any)=>{
            setIsloadiing(false);
            sethttpError(error.message);
        })

    },[]);

    useEffect(() =>{
        const fetchUserCurrentLoans = async ()=>{
            if (authState && authState.isAuthenticated){
                const url= `http://localhost:8080/api/books/secure/currentloans/count`;
                const requestOptions={
                    method : 'GET',
                    headers : {
                        Authorization : `Bearer ${authState.accessToken?.accessToken}`
                        ,
                    'Content-Type' :'application/json'

                    }
                };
                const currentLoansCountResponse = await fetch(url,requestOptions);
                if(!currentLoansCountResponse.ok){
                    throw new Error ('Something Went Wrong')
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsloadiingCurrentLoansCount(false);
        }
        fetchUserCurrentLoans().catch((error:any) => {
            setIsloadiingCurrentLoansCount(false);
            sethttpError(error.message);
        })

    },[authState,chekoutbook]);
    useEffect(()=>{
        const fetchuserchekedoutbook = async ()=>{
            if (authState && authState.isAuthenticated){
                const url =   `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookid=${bookid}`;
                const requestOptions={
                    method :'GET',
                    headers : {
                        Autharization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type' : 'application/json'
                    }
                };
                const bookcheckedouturl  = await fetch(url,requestOptions);
                if(!bookcheckedouturl.ok){
                    throw new Error ('is checkedout was wrong')
                }
                const bookcheckedouturljson = await bookcheckedouturl.json();
                setisheckedout(bookcheckedouturljson);
                console.log(ischecked)
                
            }
            setisloadingbookchekedout(false);
        }
        fetchuserchekedoutbook().catch((error:any)=>{
            setisloadingbookchekedout(false);
            sethttpError(error.message);

        });},[])

    if(isLoading || reviewloding || isLoadingCurrentLoansCount || isloadingbookcheckedout){
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

    async function chekoutbook(){
        const url = `http://localhost:8080/api/books/secure/checkout?bookid=${books?.id}`;
        const requestOptions={
            method :'PUT',
            headers : {
                Autharization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type' : 'application/json'
            }


        };
        const checkoutResonse = await fetch(url, requestOptions);
        if(!checkoutResonse.ok){
            throw new Error('something went wrong');
        }
        setisheckedout(true);
        console.log(ischecked)
    }
    return(
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {books?.img ?
                        <img src={books?.img} width='226' height='349' alt='Book'/>:
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width={226} height={349} alt="book"/>
                    }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{books?.title}</h2>
                            <h5 className="text-primary">{books?.author}</h5>
                            <p>{books?.description}</p>
                            <Star starRating={starrating} size={32}/>
                        </div>
                    </div>
                    <Checkbook Book={books} mobile={false} currentloanscount={currentLoansCount} isCheckedout={ischecked} isauthenticated={authState?.isAuthenticated} checkoutbook={chekoutbook}/>
                    
                </div><hr />
                <LatestReviews reviews={bookReview} bookId={books?.id} mobile={false}/>
               
            </div>
            <div className="d-lg-none container">
                <div className="d-flex justify-content-center align-item-center">
                    <div>
                        {books?.img ?
                        <img src={books?.img} width='226' height='349' alt='Book'/>:
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width={226} height={349} alt="book"/>
                    }
                    </div>
                    </div>
                    <div>
                        <div>
                            <h2>{books?.title}</h2>
                            <h5 className="text-primary">{books?.author}</h5>
                            <p>{books?.description}</p>
                            <Star starRating={starrating} size={32}/>
                        </div>
                    </div>
                    <Checkbook Book={books} mobile={true} currentloanscount={currentLoansCount} isCheckedout={ischecked} isauthenticated={authState?.isAuthenticated} checkoutbook={chekoutbook}/>
                    <hr />
                    <LatestReviews reviews={bookReview} bookId={books?.id} mobile={true}/>
                </div>
               
        </div>
    );
}

