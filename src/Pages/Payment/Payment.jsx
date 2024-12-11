import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/Data Provider/DataProvide";
import ProductCard from "../../Components/Products/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext);

    // Calculate total items in the basket
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    // Calculate total price
    const total = basket.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const [cardError, setCardError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Handle card input changes
    const handleChange = (e) => {
        e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
    };

    // Handle payment submission
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
        setProcessing(true);

        // STEP 1: Get client secret from backend
        const response = await axiosInstance({
            method: "POST",
            url: `/payment/create?total=${total * 100}`,
        });
        const clientSecret = response.data?.clientSecret;

        // STEP 2: Confirm payment on the client side
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement),
            },
        });

        // STEP 3: Save order details to Firestore
        const userOrdersRef = collection(db, "users", user.uid, "orders");
        const orderDoc = doc(userOrdersRef, paymentIntent.id);

        await setDoc(orderDoc, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
        });

            //empty the backet after paying
        dispatch({ type:Type.EMPTY_BASKET });

        setProcessing(false);
            navigate("/orders", {state: {msg:"You have placed your order."}})
        } catch (error) {
        console.error("Payment processing error:", error);
        setProcessing(false);
        }
    };

    return (
        <LayOut>
        {/* Header */}
        <div className={classes.payment_header}>
            Checkout ({totalItem}) items
        </div>

        {/* Payment Section */}
        <section className={classes.payment}>
            {/* Delivery Address */}
            <div className={classes.flex}>
            <h3>Delivery Address:</h3>
            <div>
                <div>{user?.email}</div>
                <div>123 Street Ln</div>
                <div>Maryland, MD</div>
            </div>
            </div>

            <hr />

            {/* Review Items */}
            <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
                {basket?.map((item) => (
                <ProductCard product={item} flex={true} key={item.id} />
                ))}
            </div>
            </div>

            <hr />

            {/* Payment Method */}
            <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment_card_container}>
                <div className={classes.payment_details}>
                <form onSubmit={handlePayment}>
                    {/* Error Message */}
                    {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                    )}

                    {/* Card Element */}
                    <CardElement onChange={handleChange} />

                    {/* Price and Pay Now Button */}
                    <div className={classes.payment_price}>
                    <div>
                        <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order |</p> <CurrencyFormat amount={total} />
                        </span>
                    </div>
                    <button type="submit" disabled={processing}>
                        {processing ? (
                        <div className={classes.loading}>
                            <ClipLoader color="grey" size={12} />
                            <p>Please wait ...</p>
                        </div>
                        ) : (
                        "Pay Now"
                        )}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </section>
        </LayOut>
    );
}

export default Payment;





// import React, {useContext, useState} from 'react'
// import classes from './Payment.module.css'
// import LayOut from '../../Components/LayOut/LayOut'
// import { DataContext } from '../../Components/Data Provider/DataProvide'
// import ProductCard from '../../Components/Products/ProductCard'
// import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
// import { axiosInstance } from '../../Api/axios'
// import { ClipLoader } from 'react-spinners'
// import { db } from '../../Utility/firebase'

// function Payment() {
//     const [{user, basket}] = useContext(DataContext);

//     const totalItem = basket?.reduce((amount,item)=>{
//         return item.amount + amount
//     },0);

//     const total = basket.reduce((amount,item) =>{
//         return item.price * item.amount + amount
//     },0)

//     const [cardError, setCardError] = useState(null);
//     const [processing, setProcessing] = useState(false);

//     const stripe = useStripe();
//     const elements = useElements();

//     const handleChange = (e)=>{
//         //console.log(e);
//         e?.error?.message? setCardError(e?.error?.message): setCardError("") 
//     };

//     const handlePayment = async (e) =>{
//         e.preventDefault()
//         try{
//             setProcessing(true)
//             //STEP 1 : backend || functions ---> contact to the client secret
//             const response = await axiosInstance({
//                 method: "POST",
//                 url: `/payment/create?total=${total*100}`,
//             });
//             //console.log(response.data);
//             const clientSecret = response.data?.clientSecret;

//             //STEP 2:  client side (react side confirmation)
//             const {paymentIntent} = await stripe.confirmCardPayment(
//                 clientSecret,
//                 {
//                     payment_method:{
//                         card: elements.getElement(CardElement)
//                     }
//                 }
//             )
//             //console.log(paymentIntent);

//             //STEP 3:  after the confirmation ---> order firestore database save, clear basket
//             await db
//             .collection("users")
//             .doc(user.uid)
//             .collection("orders")
//             .doc(paymentIntent.id)
//             .set({
//                 basket: basket,
//                 amount: paymentIntent.amount,
//                 created: paymentIntent.created,
//             });

//             setProcessing(false)
//         }catch (error){
//             console.log(error)
//             setProcessing(false)
//             }
//     }

//     return (
//         <LayOut>
//             {/* header */}
//             <div className={classes.payment_header}>
//                 Checkout ({totalItem}) items
//             </div>

//                 {/* payment method */}
//             <section className={classes.payment}>

//                 {/* address */}
//                 <div className={classes.flex}>
//                     <h3>Delivery Address: </h3>
//                     <div>
//                         <div>{user?.email}</div>
//                         <div>123 Street ln</div>
//                         <div>Maryland, MD</div>
//                     </div>
//                 </div>

//                 <hr />

//                 {/* product */}
//                 <div className={classes.flex} >
//                     <h3>Review items and delivery </h3>
//                     <div>
//                         {
//                             basket?.map((item)=><ProductCard product={item} flex={true}/>)
//                         }
//                     </div>
//                 </div>

//                 <hr /> 

//                 {/* card form */}
//                 <div className={classes.flex}>
//                     <h3>Payment methods</h3>
//                     <div className={classes.payment_card_container}>
//                         <div className={classes.payment_details}>
//                             <form onSubmit={handlePayment}>
//                                 {/* error */}
//                                 {cardError && (
//                                     <small style={{color:"red"}}>{cardError}</small>
//                                     )}

//                                     {/* card element */}
//                                 <CardElement onChange={handleChange}/>

//                                 {/* price */}
//                                 <div className={classes.payment_price}>
//                                     <div>
//                                         <span style={{display: "flex", gap: "10px"}}>
//                                             <p>Total Order |</p> <CurrencyFormat amount={total} />
//                                         </span>
//                                     </div>
//                                     <button type="submit">
//                                         {
//                                             processing?(
//                                                 <div className={classes.loading}>
//                                                     <ClipLoader color="grey" size={12}/>
//                                                     <p>Please wait ...</p>
//                                                 </div>
//                                             ):"Pay Now"
//                                         }
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </LayOut>
//     )
// }

// export default Payment


