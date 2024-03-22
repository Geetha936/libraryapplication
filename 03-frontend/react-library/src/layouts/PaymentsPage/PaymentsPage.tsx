import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../utils/Spinner";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PaymentsInfoRequests from "../../models/PaymentsInfoRequests";

export const PaymentsPage = ( ) =>{
     const {authState} = useOktaAuth();
     const [httpError ,sethttpError] = useState(false);
     const [submitDisabled , setSubmitDisabled] = useState(false);
     const [fees , setFees] =useState(0);
     const [loadingfess , setLoadingFess] = useState(true);

     useEffect( ()=>{
          const fetchFees =async () =>{
               if(authState && authState.isAuthenticated){
                    const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
                  const  requestOptions ={
                    method :'GET',
                    headers : {
                         'Content-Type' : 'application/json'
                    }

                  };
                  const paymentResponse = await fetch(url,requestOptions);
                  if(!paymentResponse.ok){
                    throw new Error ('Something went Wrong');
                  }
                  const paymentResponseJson = await paymentResponse.json();
                  setFees(paymentResponseJson.amount);
                  setLoadingFess(false);
               }
          }
          fetchFees().catch((error : any)=>{
               setLoadingFess(false);
               sethttpError(error.message);
          })
     },[authState])

     const elements = useElements();

     const stripe =  useStripe();

     async function checkout(){
          if(!stripe || !elements || !elements.getElement(CardElement)){
               return;
          }
          setSubmitDisabled(true);

          let paymentInfo = new PaymentsInfoRequests(Math.round(fees *100 ) , 'INR' , authState?.accessToken?.claims.sub);
          const url = `https://localhost:8443/api/payment/secure/payment-intent`;
          const requestOptions = {
               method :'POST' ,
                headers : {
               Authorization :   `Bearer ${authState?.accessToken?.accessToken}`,
               'Content-Type' : 'application/json'
                },
                body : JSON.stringify(paymentInfo)
          };
          const stripeResponse = await fetch (url , requestOptions );
          if(!stripeResponse.ok){
               sethttpError(true);
               setSubmitDisabled(false);
               throw new Error('Something went wrong');
          }

          const stripeResponseJson =await stripeResponse.json();

          stripe.confirmCardPayment(
               stripeResponseJson.client_secret , {
                    payment_method :{
                         card: elements.getElement(CardElement)!,
                         billing_details : {
                              email : authState?.accessToken?.claims.sub
                         }
                    }
               },{handleActions : false}
          ).then(async function(result :any){
               if(result.error){
                    setSubmitDisabled(false)
                    alert("There was an error")
               }else{
                    const url=`https://localhost:8443/api/payment/secure/payment-complete`;
                    const requestOptions = {
                         method : 'PUT',
                         headers : {
                              Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                              'Content-Type' : 'application/json'
                         }

                    };
                    const striperesponse =await fetch ( url ,requestOptions);
                    if(!stripeResponse.ok){
                         sethttpError(true)
                         setSubmitDisabled(false)
                         throw new Error("Somethiong went Wrong")
                    }
                    setFees(0);
                    setSubmitDisabled(false);

               }
          });
          sethttpError(false)

     }


     if(loadingfess){
          return (
               <SpinnerLoading/>)
     }
     return(
          <div className="container mt-2">
               {fees >0 && <div className="card mt-3">
                    <h5 className="card-header">Fees Pending : <span className="text-danger">${fees}</span> </h5>
                    <div className="car-body">
                         <h5 className="card-title mb-3">Credit Card</h5>
                         <CardElement id="card-element"></CardElement>
                         <button className="btn btn-md main-color text-white mt-2" type="button" disabled={submitDisabled} onClick={checkout}>Pay Fees</button>
                    </div>
               </div> }
               {fees === 0 && <div className="mt-3">
                    <h5>
                         You have No dues
                    </h5>
                    <Link type="button" to={"search"} className="btn btn-primary">Explore Top Books</Link>
               </div> }

               {submitDisabled && <SpinnerLoading/> }

          </div>
     );
}