
class BookModel {
    id : number;
    title:string;
    author? : string;
    description? :string;
    copies? :number;
    copiesAvailable? :number;
    category? :string;
    img?:string;

    constructor(id : number,
        title:string,
        author : string,
        description :string,
        copies:number,
        copiesAvailable :number,
        category : string,
        img:string){
            this.id=id;
            this.author=author;
            this.title=title;
            this.description=description;
            this.category=category;
            this.copies=copies;
            this.copiesAvailable=copiesAvailable;
            this.img=img;

        }

}
export default BookModel;