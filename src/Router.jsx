import React from 'react'
import {BrowserRouter as Router, Routes, Route, redirect} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51QSWeuGLLvNzOpAjTK3QHFMo4tbJmdtKuMMOG7VDIu1sZQKVmvEqj12GSqavjHWm2rO4kR2UZSUqZFV5HXF33FvD00je6joK4d');

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/auth" element={<Auth />}/>
                <Route path="/payments" element={
                    <ProtectedRoute 
                        msg={"You must log in to pay"} 
                        redirect={"/payments"}
                    >
                            <Elements stripe={stripePromise}>
                                <Payment />
                            </Elements>
                    </ProtectedRoute>
                }/>
                <Route path="/orders" element={
                    <ProtectedRoute 
                        msg={"You must log in to access your orders"} 
                        redirect={"/orders"}
                        >
                            <Orders />
                    </ProtectedRoute>
                    }/>
                <Route path="/category/:categoryName" element={<Results/>} />
                <Route path="/products/:productId" element={<ProductDetail/>}/>
                <Route path="cart" element={<Cart/>}/>
                {/* <Route path="results/jewelry" element={<Results />} /> */}
            </Routes>
        </Router>
    )
}

export default Routing;