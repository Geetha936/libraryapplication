import { useState } from "react";
import { Star } from "./Stars";
export const StarReview: React.FC<{submitReview : any}> = (props)=>{
    const [starInput , SetStarInput] = useState(0);
    const [displayInput , setdisplayInput] = useState(false)
    const [description, setdescription] = useState('')
    function starValue( value : number){
        SetStarInput(value);
        setdisplayInput(true);
    }
return(
    <div className="dropdown" style={{cursor : 'pointer'}}>
        <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle='dropdown'>Leave a Review ?</h5>
        <ul className="dropdown-menu" id="SubmitReviewRating" aria-labelledby="dropdownMenuButton1">
            <li ><button className="dropdown-item" onClick={()=> starValue(0)}>0 star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(0.5)}>0.5star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(1)}>1star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(1.5)}>1.5star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(2)}>2 star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(2.5)}>2.5star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(3)}>3 star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(3.5)}>3.5star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(4)}>4 star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(4.5)}>4.5star</button></li>
            <li ><button className="dropdown-item" onClick={()=> starValue(5)}>5 star</button></li>
        </ul>

        <Star starRating={starInput} size={32} />
        {displayInput && 
        <form action="#" method='POST'>
            <hr />
            <div className="mb-3">
                <label className="form-label">Description</label>
            <textarea rows={3}  placeholder="Optional" className="form-control" id="submitReviewDescription"
            onChange={(e)=>setdescription(e.target.value)}></textarea>
            </div>
            <div>
            <button className="btn btn-success" type="button" onClick={()=>{props.submitReview(starInput,description)}}>Submit</button></div>
        </form>
        
        }
        
        </div>
    
);

}