import { useState } from "react";
import { PostNewMessage } from "./components/PostNewMessage";
import { Messages } from "./components/Messages";

export const MessagesPage =()=>{
     const [messagesClick,setmessagesclick] = useState(false)
     
     return(
          <div className="container">
               <div className="mt-3 mb-2">
                    <nav>
                         <div className="nav nav-tabs" id="nav-tab" role="tablist">
                              <button className="nav-link active" onClick={()=>setmessagesclick(false)} id="nav-send-message-tab" data-bs-toggle="tab" data-bs-target="#nav-send-message"
                              type="button" role="tab" aria-controls="nav-send-message" aria-selected="true">
                                   Submit Question
                              </button>
                              <button onClick={()=>setmessagesclick(true)} className="nav-link" id="nav-message-tab"
                              data-bs-toggle="tab" data-bs-target="#nav-message" aria-selected="false" aria-controls="nav-message" type="button">Q/A Response/Pending</button>
                         </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                         <div className="tab-pane fade show active" id="nav-send-message" aria-aria-labelledby="nav-send-message-tab" role="tabpanel">
                              
                              <PostNewMessage/>

                         </div>
                         <div className="fade tab-pane" id="nav-message" aria-labelledby="nav-message-tab" role="tabpanel">
                              {messagesClick ? <Messages/>: <></>}
                         </div>

                    </div>
               </div>
          </div>
     );
}