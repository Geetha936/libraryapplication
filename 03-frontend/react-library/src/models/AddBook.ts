class AddBook {
     author : string ;
     title : string ;
     description : string;
     copies : number ;
     img ?: string ;
     category : string ;


     constructor(title : string ,
          author : string ,
          description : string,
          copies : number ,
          category : string ){
               this.author=author;
               this.title=title;
               this.category=category;
               this.copies=copies;
               this.description=description;
          }
     
}

export default AddBook;