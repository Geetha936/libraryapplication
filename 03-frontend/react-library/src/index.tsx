import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OSF9WSHRGhd9izkld4k4VYrKZ4b394HUWlu5lWefb1uKRHqEzmWWWlwmp3mMGRCeiH7xJlJ1jEOevDnfPfrsIZq00SxOdf7uj')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}><App /></Elements>
        
  </BrowserRouter>
    

);


