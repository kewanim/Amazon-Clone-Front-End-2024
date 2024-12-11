import React, { useContext } from 'react';
import classes from './Cart.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/Data Provider/DataProvide';
import ProductCard from '../../Components/Products/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
    const [{ basket, user }, disptach] = useContext(DataContext);
    const total = basket.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const increment = (item) => {
        disptach({
            type: Type.ADD_TO_BASKET,
            item
        });
    };

    const decrement = (id) => {
        disptach({
            type: Type.REMOVE_FROM_BASKET,
            id
        });
    };

    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.cart__container}>
                    <h2>Hello<br /></h2>
                    <h3>Your shopping basket <br /></h3>
                    <hr />
                    {
                        basket?.length === 0 ? (
                            <p><br />No items in your cart</p>
                        ) : (
                            basket?.map((item, i) => (
                                <section
                                    className={classes.cart_product}
                                    key={item.id || i} // Fix: Added `key` to fix unique key warning
                                >
                                    <ProductCard
                                        product={item}
                                        renderDesc={true}
                                        renderAdd={false}
                                        flex={true}
                                    />
                                    <div className={classes.button_container}>
                                        <button className={classes.button} onClick={() => increment(item)}>
                                            <IoIosArrowUp size={20} />
                                        </button>
                                        <span>{item.amount}</span>
                                        <button className={classes.button} onClick={() => decrement(item.id)}>
                                            <IoIosArrowDown size={20} />
                                        </button>
                                    </div>
                                </section>
                            ))
                        )
                    }
                </div>

                {basket?.length !== 0 && (
                    <div className={classes.subtotal}>
                        <div>
                            <p>Subtotal ({basket?.length} items)</p>
                            <CurrencyFormat amount={total} />
                        </div>
                        <span>
                            <input type="checkbox" />
                            <small>This order contains a gift </small>
                        </span>
                        <Link to="/payments"> Continue to checkout</Link>
                    </div>
                )}
            </section>
        </LayOut>
    );
}

export default Cart;




// import React, { useContext } from 'react'
// import classes from './Cart.module.css'
// import LayOut from '../../Components/LayOut/LayOut'
// import { DataContext } from '../../Components/Data Provider/DataProvide'
// import ProductCard from '../../Components/Products/ProductCard'
// import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
// import { Link } from 'react-router-dom'
// import {Type} from '../../Utility/action.type'
// import { IoIosArrowDown } from "react-icons/io"
// import { IoIosArrowUp } from "react-icons/io";

// function Cart() {
//     const [{ basket, user}, disptach] = useContext(DataContext);
//     const total = basket.reduce((amount,item) =>{
//         return item.price * item.amount + amount
//     },0)

//     const increment=(item)=>{
//         disptach({
//             type:Type.ADD_TO_BASKET,
//             item
//         })
//     }

//     const decrement=(id)=>{
//         disptach({
//             type:Type.REMOVE_FROM_BASKET,
//             id
//         })
//     }

//     return (
//         <LayOut>
//             <section className={classes.container} >
//                 <div className={classes.cart__container}>
//                     <h2>Hello<br/></h2>
//                     <h3>Your shopping basket <br/></h3>
//                     <hr />
//                     {
//                         basket?.length==0?(<p><br/>No items in you cart</p>):(
//                             basket?.map((item,i)=>{
//                                 return <section className={classes.cart_product}>
//                                             <ProductCard
//                                             key={i}
//                                                 product={item}
//                                                 renderDesc={true}
//                                                 renderAdd={false}
//                                                 flex={true}
//                                             />
//                                             <div className={classes.button_container}>
//                                                 <button className={classes.button} onClick={()=>increment(item)}>
//                                                     <IoIosArrowUp size={20} />
//                                                 </button>
//                                                 <span>{item.amount}</span>
//                                                 <button className={classes.button} onClick={()=>decrement(item.id)}>
//                                                     <IoIosArrowDown size={20} />
//                                                 </button>
//                                             </div>
//                                         </section>
//                             })
//                         )
//                     }
//                 </div>
                
//                     {basket?.length !==0&&(
//                         <div className={classes.subtotal}>
//                             <div>
//                                 <p>Subtotal ({basket?.length} items)</p>
//                                 <CurrencyFormat amount={total}/>
//                             </div>
//                             <span>
//                                 <input type="checkbox" />
//                                 <small>This order contains a gift </small>
//                             </span>
//                             <Link to="/payments"> Continue to checkout</Link>
//                         </div>
//                     )}
                
//             </section>
//         </LayOut>
//     )
// }

// export default Cart