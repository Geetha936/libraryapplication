import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBook :React.FC<{Book:BookModel}> = (props) => {
    return(
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                <div className="d-none d-lg-block">
                    {props.Book.img ?
                    <img src={props.Book.img}
                    width='123'
                    height='196'
                    alt="Book"/>:
                    <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} 
                    width='123'
                    height='196'
                    alt="Book"/>
                }
                </div>
                <div className="d-lg-none d-flex justify-content-center align-items-center">
                {props.Book.img ?
                    <img src={props.Book.img}
                    width='123'
                    height='196'
                    alt="Book"/>:
                    <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} 
                    width='123'
                    height='196'
                    alt="Book"/>
                }
                </div>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <h5 className="card-title">{props.Book.author}</h5>
                    <h4>{props.Book.title}</h4>
                    <p className="card-text">{props.Book.description}</p>
                </div>
            </div>
            <div className=" col-md-4 d-flex justify-content-center align-items-center">
                <Link to={`/checkout/${props.Book.id}`} className="btn btn-md main-color text-white ">view details</Link>
            </div>
            </div>
        </div>
    );
}