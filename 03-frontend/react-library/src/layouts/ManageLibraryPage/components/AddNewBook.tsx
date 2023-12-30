import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import AddBook from "../../../models/AddBook";

export const AddnewBook =() =>{

     const {authState} = useOktaAuth();

     const [title,settitle] = useState("");
     const [author , setauthor] = useState("");
     const [description , setDescription] = useState('');
     const [copies , setcopies] = useState(0);
     const [categoey , setcategory ] = useState('category');
     const [success , setSuccess] = useState(false);
     const [ warning , setwarning ] = useState(false);
     const [image , setimage] = useState<any>(null);

     function categoryfeild(value : string){
          setcategory(value);
     }
     async function base64ConverstionForImages(e:any) {
          if(e.target.files[0]){
               getBase64(e.target.files[0]);
          }
     }

     async function getBase64(file : any){
          let reader  = new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function (){
               setimage(reader.result);
          }
          reader.onerror = function(error){
               console.log('Error ', error);
          }

     }

     async function submitBook(){
          const url =    `${process.env.REACT_APP_API}/admin/secure/add/book`
          if(authState?.isAuthenticated && title!=='' && description!=='' && copies>0 && author!=='' && categoey!=='catehory' ){
               const book : AddBook = new AddBook(title,author,description,copies,categoey);
               book.img=image;
               const requestOptions = {
                    method : 'POST',
                    headers :{ Authorization : `Bearer ${authState.accessToken?.accessToken}`, 
                                   'Content-type' : 'application/json' },
                                   body : JSON.stringify(book)

               }
               const responseUrl = await fetch(url ,requestOptions);
               if(!responseUrl.ok){
                    throw new Error (" Submit Book gone wromg");
               }
               setSuccess(true)
               settitle('')
               setDescription('')
               setauthor('')
               setcopies(0)
               setimage(null)
               setcategory('category')
               setwarning(false)
          }
          else{
               setwarning(true)
               setSuccess(false)
          }
          

     }


     return(
          <div className="card mt-2 shadow pd-2">
               <div className="card-header ">
                    Add New Book Details 

                    {warning && <div className="alert alert-danger" role="alert"> All feilds must be filled Out</div>}
                    {success && <div className="alert alert-success" role ="alert">BooK Added Successfully</div> }

               </div>
               <div className="card-body ">
                    <form method="POST">
                         <div className="row">
                              <div className="col-5">
                                   <label htmlFor="title" className="form-label">Title</label>
                                   <input type="text" className="form-control" onChange={e => settitle(e.target.value)} value={title}/>
                              </div>
                              <div className="col-4">
                                   <label htmlFor="author" className="form-label">Author</label>
                                   <input type="text" className="form-control" onChange={e => setauthor(e.target.value)} value={author}/>
                              </div>

                              <div className="col-3">
                                   <label htmlFor="categoey" className="form-label">Category</label>
                                   <button type="button" className="form-control btn-btn-primary dropdown-toggle" aria-expanded="false" id="dropdownMenuButton1" data-bs-toggle="dropdown" >{categoey}</button>
                                   <ul id="addNewBookId" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li ><a onClick={()=> categoryfeild('FE')} className="dropdown-item" >Front End </a></li>
                                        <li ><a onClick={()=> categoryfeild('BE')} className="dropdown-item" >Back End</a></li>
                                        <li ><a onClick={()=> categoryfeild('DevOps')} className="dropdown-item" >Dev Ops</a></li>
                                        <li ><a onClick={()=> categoryfeild('Data')} className="dropdown-item" >Data</a></li>
                                   </ul>
                              </div>  
                         </div>
                         <div>
                              <label htmlFor="description" className="form-label">Description:</label>
                              <textarea name="" id=""  rows={3} className="form-control" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                         </div>

                         <label htmlFor="copies" className="form-label mt-2">Copies</label>
                         <input type="number" className="form-control" onChange={e=>setcopies(Number(e.target.value))} />

                         <input type="file" className="form-control mt-2"  onChange={e => base64ConverstionForImages(e)} />

                         <button className="btn btn-primary mt-3" onClick={submitBook} type="button">Add Book</button>
                    </form>

               </div>

          </div>
     );
}