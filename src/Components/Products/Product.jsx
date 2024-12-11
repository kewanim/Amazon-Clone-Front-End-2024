import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'
import Loader from '../Loader/Loader';


function Product() {
    const [products, setProducts] = useState([]); // Initialize with an empty array
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data); // Set fetched data
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err); // Handle any errors
                setIsLoading(false)
            });
    }, []);

        return (
            <>
            {
            isLoading?(<Loader/>) : (<section className={classes.products__container}>
                    {products.map((singleProduct) => (
                        <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
                    ))}
                </section>)
            }
                
            </>
        );
};

export default Product;