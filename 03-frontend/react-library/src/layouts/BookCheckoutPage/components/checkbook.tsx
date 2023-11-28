import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const Checkbook :React.FC<{Book:BookModel | undefined,mobile :boolean,currentloanscount : number , isauthenticated: any , isCheckedout : boolean
checkoutbook : any}> =(props)=>{
    function buttonrender(){
        if(props.isauthenticated){
            if(!props.isCheckedout && props.currentloanscount<5){
                return(
                    <button onClick={()=>props.checkoutbook()} className="btn btn-primary btn-lg">checkout</button>
                )
            }else if(props.isCheckedout){
                    return(<p><b>Book checked out. Enjoy</b></p>)
            }else if(!props.isCheckedout){
                return(<p className="text-danger">Too many books checked out</p>)
            }
        }
        return(<Link to={'/login'} className="btn btn-success btn-lg">Sign In</Link>)

    }
    return(
        <div className={props.mobile? 'card d-flex mt-5 ': 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
            <p> {props.currentloanscount}/5 books checked out</p>
            <hr/>
            {props.Book && props.Book.copiesAvailable && props.Book.copiesAvailable >0 ?
            <h4 className="text-success">Available</h4>:
            <h4 className="text-danger">Wait List</h4>}
            <div className="row">
                <p className="col-6">{props.Book?.copies} copies</p>
                <p className="col-6">{props.Book?.copiesAvailable} Available</p>    
            </div>
            {buttonrender()}<hr />
            <p className="mt-3"> This number can change until placing order has been completed</p>
            <p>Sign to leave a review</p>
            </div>
        </div>
    );
}