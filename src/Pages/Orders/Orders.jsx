import React, { useContext, useEffect, useState } from 'react';
import classes from './Orders.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/Data Provider/DataProvide';
import ProductCard from '../../Components/Products/ProductCard';
// Import Firestore modular methods
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function Orders() {
    const [{ user }, dispatch] = useContext(DataContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            // Replace db.collection with Firestore modular methods
            const ordersRef = collection(db, "users", user.uid, "orders");
            const ordersQuery = query(ordersRef, orderBy("created", "desc"));

            // Setup snapshot listener
            const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
                setOrders(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });

            // Cleanup listener when component unmounts
            return () => unsubscribe();
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.orders_container}>
                    <h2>Your Orders : </h2>
                    {
                        orders?.length == 0 && 
                        <div style={{padding: "20px"}}>
                            You don't ahve any orders yet.
                        </div>
                    }
                    {/* ordered items */}
                    <div>
                        {orders?.map((eachOrder, i) => (
                            <div key={i}>
                                <hr />
                                <p>Order ID: {eachOrder?.id}</p>
                                {eachOrder?.data?.basket?.map((order) => (
                                    <ProductCard
                                        flex={true}
                                        product={order} // Corrected typo from "prodcuct"
                                        key={order.id}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LayOut>
    );
}

export default Orders;


// import React, {useContext, useEffect, useState} from 'react'
// import classes from './Orders.module.css'
// import LayOut from '../../Components/LayOut/LayOut'
// import { db } from '../../Utility/firebase'
// import { DataContext } from '../../Components/Data Provider/DataProvide'
// import ProductCard from '../../Components/Products/ProductCard'

// function Orders() {
//     const [{user}, dispatch] = useContext(DataContext)
//     const [orders, setOrders] = useState([])

//     useEffect(()=>{
//         if(user){
//             db.collection("users")
//             .doc(user.uid)
//             .collection("orders")
//             .orderBy("created", "desc")
//             .onSnapshot((snapshot)=>{
//                 console.log(snapshot)
//                 setOrders(
//                     snapshot.docs.map((doc)=>({
//                         id: doc.id,
//                         data: doc.data()
//                     }))
//                 )
//             })
//         }else{
//             setOrders([])
//         }
//     },[]);

//     return (
//         <LayOut>
//             <section className={classes.container}>
//                 <div className={classes.orders_container}>
//                     <h2>Your Orders</h2>
//                     {/* ordered items */}
//                     <div>
//                         {
//                             orders?.map((eachOrder, i)=>{
//                                 return (
//                                     <div key={i}>
//                                         <hr/>
//                                         <p>Order ID: {eachOrder?.id}</p>
//                                         {
//                                             eachOrder?.data?.basket?.map(order=>{
//                                                 <ProductCard
//                                                 flex={true}
//                                                 prodcuct={order}
//                                                 key={order.id}
//                                                 />
//                                             })
//                                         }
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </section>
//         </LayOut>
//     )
// }

// export default Orders
