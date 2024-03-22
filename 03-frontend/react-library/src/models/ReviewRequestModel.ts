class ReviewRequestModel{
    bookId : number;
    rating : number;
    reviewDescription? : String;

    constructor( rating :number ,bookId : number , reviewDescription: String){
        this.bookId=bookId;
        this.rating=rating;
        this.reviewDescription=reviewDescription;
    }
}

export default ReviewRequestModel;