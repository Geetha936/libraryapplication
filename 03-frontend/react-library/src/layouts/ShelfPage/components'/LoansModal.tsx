import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";



export const LoansModal :React.FC<{shelfCurrentloan : ShelfCurrentLoans, mobile : boolean , returnBook :any , renewBookLoan : any}> = (props) =>{
     return(
          <div className="modal fade" id={props.mobile ? `mobilemodal${props.shelfCurrentloan.book.id}`
          : `modal${props.shelfCurrentloan.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false'
          aria-aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentloan.book.id}>
               <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id='staticBackdropLabel'>Loan Options</h5>
                              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label='close'></button>
                         </div>
                         <div className="modal-body">
                              <div className="container">
                                   <div className="mt-3">
                                        <div className="row">
                                             <div className="col-2">
                                                  {props.shelfCurrentloan.book.img ?
                                                  <img src={props.shelfCurrentloan.book.img} width="56" height="87" alt="book"/>:
                                                  <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width="56" height="87" alt="book" /> }
                                             </div>
                                             <div className="col-10">
                                                  <h6>{props.shelfCurrentloan.book.author}</h6>
                                                  <h4>{props.shelfCurrentloan.book.title}</h4>
                                             </div>
                                        </div>
                                        <hr />
                                        {props.shelfCurrentloan.daysLeft> 0 && 
                                             <p className="text-secondary">Due in {props.shelfCurrentloan.daysLeft}</p>
                                        }
                                        {props.shelfCurrentloan.daysLeft===0 && 
                                             <p className="text-success">Due Today</p>
                                             }
                                        {props.shelfCurrentloan.daysLeft<0 &&
                                             <p className="text-danger">
                                             Past Due by {props.shelfCurrentloan.daysLeft} days
                                             </p>}
                                             <div className="list-group mt-3">
                                                  <button className="list-group-item list-group-item-action" data-bs-dismiss='modal' aria-content="true" onClick={()=>props.returnBook(props.shelfCurrentloan.book.id)}>Return Book</button>
                                                  <button onClick={props.shelfCurrentloan.daysLeft < 0 ? (event) => event.preventDefault()  : ()=>props.renewBookLoan(props.shelfCurrentloan.book.id)}
                                                  data-bs-dismiss='modal' className={props.shelfCurrentloan.daysLeft < 0 ? 'list-group-item list-group-item-action inactive': 'list-group-item list-group-item-action'}>
                                                       {props.shelfCurrentloan.daysLeft<0 ? 'Late dues cannot be renwed' : 'Renew loan for 7 days'}
                                                  </button>
                                             </div>
                                   </div>
                              </div>
                         </div>
                         <div className="modal-footer">
                              <button className="btn btn-secondary" type="button" data-bs-dismiss='modal'>Close</button>
                         </div>
                    </div>
               </div>

          </div>
     );
}

export default LoansModal;