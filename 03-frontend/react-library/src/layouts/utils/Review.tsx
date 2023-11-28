import ReviewModel from "../../models/ReviewModel"
import { Star } from "./Stars";

export const Review : React.FC<{review : ReviewModel} >=(props) =>{
    const date = new Date(props.review.date);
    const longMonth =date.toLocaleString('en-us', {month : 'long'});
    const dateDay =date.getDate();
    const dateYear =date.getFullYear();
    const RenderDate = dateDay+'/'+longMonth +"/"+dateYear
    return(
        <div className="col-sm-8 col-md-8">
             <h5>{props.review.userEmail}</h5>
            <div className="row ">
                <div className="col">
                {RenderDate}
                </div>
                <div className="col ">
                    <Star starRating={props.review.rating} size={16}/>
                </div>
            <div><p>{props.review.reviewDescription}</p></div>

        </div>
        <hr />
        </div>
    );
}