// import React, { useEffect, useState } from 'react'
// import classes from './Results.module.css'
// import LayOut from '../../Components/LayOut/LayOut';
// import {useParams} from 'react-router-dom'
// import axios from 'axios'
// import { productUrl } from '../../Api/endPoints';
// import ProductCard from '../../Components/Products/ProductCard';

// function Results() {
//     const [results, setResults] = useState([]);
//     const {categoryName} =useParams()
//     useEffect(() =>{
//     axios.get(`${productUrl}/products/category/${categoryName}`)
//     .then((res) =>{
//         setResults(res.data)
//         console.log(res.data)
//     }) .catch((err) =>{
//         console.log(err)
//     })
// }, [])

//     return (
//         <LayOut>
//             <section>
//                 <h1 style={{ padding: "30px" }}>Results</h1>
//                 <p style={{ padding: "30px" }}>Category / {categoryName}</p>
//                 <hr />
//                     <div className= {classes.products__container}>
//                         {results?.map((product) =>(
//                             <ProductCard
//                                 key={product.id}

//                                 product={product}
//                             />
//                         ))}
//                     </div>
//             </section>
//         </LayOut>
//     )
// }

// export default Results




import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';
import Loader from '../../Components/Loader/Loader'; // Import Loader

function Results() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const { categoryName } = useParams();

    useEffect(() => {
        setIsLoading(true); // Start loading
        axios.get(`${productUrl}/products/category/${categoryName}`)
            .then((res) => {
                setResults(res.data);
                setIsLoading(false); // Stop loading on success
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false); // Stop loading on error
            });
    }, [categoryName]);

    return (
        <LayOut>
            <section>
                <h1 style={{ padding: "30px" }}>Results</h1>
                <p style={{ padding: "30px" }}>Category / {categoryName}</p>
                <hr />
                {isLoading ? (
                    <Loader /> // Display loader while data is being fetched
                ) : (
                    <div className={classes.products__container}>
                        {results?.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                renderDesc={false}
                                renderAdd={true}
                            />
                        ))}
                    </div>
                )}
            </section>
        </LayOut>
    );
}

export default Results;