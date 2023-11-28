import React from 'react'
import BookModel from '../../../models/BookModel';
import { Link } from 'react-router-dom';
export const ReturnBook: React.FC<{Book:BookModel}> =(props) =>{
    return(
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.Book.img? <img src={props.Book.img} width='151' height='233' alt="book" /> :
                <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} width='151' height='233' alt="book" />}
                
                    <h6 className="mt-2">{props.Book.title}</h6>
                    <p>{props.Book.author}</p>
                    <Link className="btn main-color text-white" to={`Checkout/${props.Book.id}`}>Reserve</Link>
            </div>
        </div>


    )
};