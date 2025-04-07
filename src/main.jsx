import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe public key
const stripePromise = loadStripe('pk_test_51Q3gTfRrt2PQUqSbVEoOeGz9AVMcZnnUQuSoD0jBEEFeGjW1ySR41Cni3CoTkBCcXIimH0H0uERZ5s65s3m3V0la00T5f1Yd5r');

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </StoreContextProvider>
  </BrowserRouter>
);
