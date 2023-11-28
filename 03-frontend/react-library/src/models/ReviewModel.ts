class ReviewModel {
    id : number;
    userEmail : string;
    book_id : number;
    date : string;
    rating: number;
    reviewDescription? : string;

    constructor(id : number,
        userEmail : string,
        book_id : number,
        date : string,
        rating: number,
        reviewDescription? : string){
            this.book_id=book_id;
            this.date=date;
            this.userEmail=userEmail;
            this.id=id;
            this.reviewDescription=reviewDescription;
            this.rating=rating;
        }
}
export default ReviewModel;