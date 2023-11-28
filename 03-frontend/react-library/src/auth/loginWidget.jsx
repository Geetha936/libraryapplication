import {Redirect} from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/utils/Spinner";
import OktaSignInWidth from "./oktaSignInWidget";
const LoginWidget =({config})=>{
    const {oktaAuth,authState} = useOktaAuth();
    const onSuccess =(tokens) =>{
        oktaAuth.handleLoginRedirect(tokens);
    };
    const onError = (err)=>{
        console.log("sign in error", err);
    };
    if(!authState){
        return(<SpinnerLoading/>);
    }
    return authState.isAuthenticated ? <Redirect to={{pathname:'/'}}/>
    :
    <OktaSignInWidth config={config}  onSuccess={onSuccess} onError={onError}/>
};

export default LoginWidget;