import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Invoices from './pages/Invoices';
import Details from './pages/Invoice_Details';
import Header from './components/Header';
import AddInvoice from './pages/AddInvoice';




function App() {
  

  return (
    <BrowserRouter>
        <div className="App">
          <ToastContainer/>
            <Header/>
              <Routes>
                <Route exact path="/clients" element={<Clients/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/invoices" element={<Invoices/>}/>
                <Route exact path="/invoiceDetails/:invoice_id" element={<Details/>}/>
                <Route exact path="/create_invoice" element={<AddInvoice/>}/>
                
              </Routes>
            
          
        </div>
    </BrowserRouter>

  );
}

export default App;
