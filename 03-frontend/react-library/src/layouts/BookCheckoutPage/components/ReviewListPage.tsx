import { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { SpinnerLoading } from "../../utils/Spinner";
import { Review } from "../../utils/Review";
import { Pagination } from "../../utils/paginstion";

export const ReviewListPage = () =>{
    const [reviews ,Setreviews] = useState<ReviewModel[]>([]);
    const [isLoading , setisLoading ] = useState(true);
    const [httpError, sethttpError] = useState(null);
    //pagination

    const [currentpage , setCurrentPage] = useState(1);
    const [reviewsPerPage, setReviesPerPage] = useState(5);
    const [totalAmountofReviews, settotalAmountofReviews] = useState(0);
    const [totalPages , setTotalPages]= useState(0);

    const bookId = (window.location.pathname).split('/')[2];
    
    useEffect(()=>{
        const fetchReviews= async () =>{
            const reviewUrl : string =   `${process.env.REACT_APP_API}/reviews/search/findReviewByBookId?bookId=${bookId}&page=${currentpage-1}&size=${reviewsPerPage}`;
            const responseReviw = await fetch(reviewUrl);
            if(!responseReviw.ok){
                throw new Error("something went wrong")
            }
            const reviewJson = await responseReviw.json();
            const reviewData = reviewJson._embedded.reviews;
            settotalAmountofReviews(reviewJson.page.totalElements);
            setTotalPages(reviewJson.page.totalPages)
            const loadedReview: ReviewModel[]= []; 
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
            }
            Setreviews(loadedReview);
            setisLoading(false);
        };
        fetchReviews().catch((error :any)=>{
            setisLoading(false);
            sethttpError(error.message);
        })
    },[currentpage]);
    if(isLoading){
        return(
            <SpinnerLoading/>
        )
    }
    if (httpError){
        return(
            <div className="container m-5">
                {httpError}
            </div>
        )
    }

    const indexOfLastReview : number = currentpage * reviewsPerPage;
    const indexOfFirstReview : number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentpage <=totalAmountofReviews ?  reviewsPerPage * currentpage : totalAmountofReviews;
     
    const paginate = (pageNumber : number ) => setCurrentPage(pageNumber);

    return (
        <div className="container m-5">
            <div>
                <h3>
                    Comments: ({reviews.length})
                </h3>
            </div>
            <p>{indexOfFirstReview +1} to {lastItem} of {totalAmountofReviews} items;</p> 
            <div className="row">
                {reviews.map(review =>(
                    <Review review={review} key={review.id}/>
                ))}
            </div>
                
            {totalPages >1 && <Pagination currentPage={currentpage} totalPages={totalPages} paginate={paginate} />}

        </div>
    );
}