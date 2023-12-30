import { useState } from "react";
import { HistoryPage } from "./components'/HistoryPage";
import Loans from "./components'/Loans";

export const ShelfPage=()=>{
     const [historyclicked , sethistoryclicked] = useState(false)
      return(
          <div className="container">
               <div className="mt-3">
                    <nav>
                         <div className="nav nav-tabs" id="nav-tab" role="tablist">
                              <button onClick={()=>sethistoryclicked(false)} className="nav-link active" id="nav-loans-tab" data-bs-toggle='tab'
                              data-bs-target="#nav-loans" type="button" role="tab" aria-selected="true">
                                   Loans
                              </button>
                              <button onClick={()=>sethistoryclicked(true)} className="nav-link" data-bs-target="#nav-history" data-bs-toggle="tab"
                              aria-selected="false" type="button" role="tab" id="nav-history-tab">
                                   Your History
                              </button>
                         </div>
                    </nav>
                    <div className="tab-content" id="nav-tabcontent">
                         <div className="tab-pane fade show active" id="nav-loans" aria-labelledby="nav-loans-tab" role="tabpanel" >
                              <Loans/>
                         </div>
                         <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                              { historyclicked ? <HistoryPage/> : <></>}
                         </div>

                    </div>
               </div>
          </div>
     );
}