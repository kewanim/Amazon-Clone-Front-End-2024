import React, { useContext } from 'react';
import LowerHeader from "./LowerHeader";
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { DataContext } from '../Data Provider/DataProvide';
import { auth } from '../../Utility/firebase';

const Header = () => {
    
    const [{user, basket},dispatch]=useContext(DataContext)
    const totalItem = basket?.reduce((amount,item)=>{
        return item.amount + amount
    },0);

    return (
        <section className={classes.fixed}>
            <section>
                <div className={classes.header__container}>
                    {/* logo section */}
                    <div className={classes.logo__container}>
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                        </Link>
                        {/* delivery */}
                        <div className={classes.delivery}>
                            <span>
                                <SlLocationPin />
                            </span>
                            <div>
                                <p>Delivered to </p>
                                <span>US</span>
                            </div>
                        </div>
                    </div>                   
                    {/* search */}
                    <div className={classes.search}>
                        <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input type="text" />
                        <CiSearch size={25}/>
                    </div>
                    {/* right side */}
                    <div className={classes.order__container}>
                        <Link to="" className={classes.language}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="US Flag"/>
                            <select name='' id=''>
                                <option value="">EN</option>
                            </select>
                        </Link>
                        <Link to={!user &&"/auth"}>
                            <div>
                                {
                                    user ? (
                                        <>
                                            <p>Hello {user?.email?.split("@")[0]?.charAt(0).toUpperCase() + user?.email?.split("@")[0]?.slice(1)} </p>
                                            <span onClick={()=>auth.signOut()}>Sign Out</span>
                                        </>
                                    ) :(
                                        <>
                                            <p>Hello, Sign in </p>
                                            <span>Account & Lists</span>
                                        </>
                                    )
                                }
                            </div>
                        </Link>
                        <Link to="/orders">
                            <p>returns</p>
                            <span>& Orders</span>
                        </Link>
                        <Link to="/cart" className={classes.cart}>
                            <BiCart size={35} />
                            <span>{totalItem}</span>
                        </Link>
                    </div>
                </div>
            </section>
            <LowerHeader/>
        </section>
    );
};

export default Header;