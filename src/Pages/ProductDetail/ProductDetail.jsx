import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const { productId } = useParams()
    useEffect(() =>{
        setIsLoading(true)
        axios.get(`${productUrl}/products/${productId}`)
        .then((res)=>{
            console.log(res.data)
            setProduct(res.data); 
            setIsLoading(false)
        }) .catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })
    }, [])
    console.log(product)
    return (
        <LayOut>
            {isLoading? (<Loader/>):(<ProductCard
                        product={product}
                        flex ={true}
                        renderDesc={true}
                        renderAdd={true}
                    />)}
                <div>
                    
                </div>
        </LayOut>
    )
}

export default ProductDetail