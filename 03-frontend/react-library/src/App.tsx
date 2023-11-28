import React from 'react';
import './App.css';
import { Homepage } from './layouts/Homepage/Homepage';
import { Navbar } from './layouts/navbarAndFotter/Navbar';
import { Fotter } from './layouts/navbarAndFotter/fotter';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchbooksPage';
import { Redirect, Route, Switch , useHistory } from 'react-router-dom';
import { BookCheckoutpage } from './layouts/BookCheckoutPage/BookChechoutPage';
import { OktaConfig } from './lib/oktaConfig';
import { OktaAuth ,toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './auth/loginWidget';

export const App =()=> {
  const oktaAuth = new OktaAuth(OktaConfig)

const customAuthHandler =()=>{
  history.push('/login');
}
const history= useHistory();

const restoreOriginalUri =async (_oktaAuth:any,originalUri : any) => {
  history.replace(toRelativeUrl(originalUri || '/' ,window.location.origin));
  
};
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
           <Navbar/>
           <div className='flex-grow-1'>
           <Switch>
           <Route path='/' exact><Redirect to='/home'/></Route>
           <Route path='/home' exact><Homepage/></Route>
           <Route path='/search'><SearchBooksPage/></Route>
           <Route path='/checkout/:bookId'><BookCheckoutpage/></Route>
           <Route path='/login' render={()=> <LoginWidget config={OktaConfig}/>}></Route>
           <Route path='/login/callback' component={LoginCallback}></Route>
           </Switch>
           </div>
      <Fotter/>
      </Security>
    </div>
  );
}

