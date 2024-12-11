// import React from 'react'
// import {Carousel} from 'react-responsive-carousel'
// import {img} from './img/data'
// import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
// import classes from './../Carousel/Carousel.module.css'



// function CarouselEffect() {
//     return (
//         <div>
//             <Carousel
//                 autoPlay={true}
//                 infiniteLoop={true}
//                 showIndicators={false}
//                 showThumbs={false}        
//             >
//                 {
//                     img.map((imageItemLink)=>{
//                         return <img key={ imageItemLink} src={imageItemLink} />

//                         //added key={index} alt={`Carousel Item ${index}`}//
//                     })  
//                 }

//             </Carousel>
//                 <div className={classes.hero__img}></div>
//         </div>
//     )
// }

// export default CarouselEffect;

//------------------------------------------------------------------------
// import React from 'react'
// import { Carousel } from 'react-responsive-carousel'
// import { img } from './img/data'
// import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
// import classes from './../Carousel/Carousel.module.css'

// function CarouselEffect() {
//     return (
//         <div>
//             <Carousel
//                 autoPlay={true}
//                 infiniteLoop={true}
//                 showIndicators={false}
//                 showThumbs={false}
//             >
//                 {
//                     img.map((imageItemLink, index) => (
//                         <img src={imageItemLink} key={index} alt={`Slide ${index + 1}`} />
//                     ))
//                 }
//             </Carousel>
//             <div className={classes.hero__img}></div>
//         </div>
//     )
// }

// export default CarouselEffect;



//-----------------------------

// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import { img } from './img/data';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import classes from './../Carousel/Carousel.module.css';

// function CarouselEffect() {
//     return (
//         <div>
//             <Carousel
//                 autoPlay={true}
//                 infiniteLoop={true}
//                 showIndicators={false}
//                 showThumbs={false}
//             >
//                 {
//                     // Ensure index is correctly passed into the map callback
//                     img.map((imageItemLink, index) => {
//                         return (
//                             <img 
//                                 src={imageItemLink} 
//                                 key={index} 
//                                 alt={`Carousel Item ${index}`} 
//                             />
//                         );
//                     })
//                 }
//             </Carousel>
//             <div className={classes.hero__img}></div>
//         </div>
//     );
// }

// export default CarouselEffect;

//-----------------------------


import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { img } from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import classes from './../Carousel/Carousel.module.css'

function CarouselEffect() {
    return (
        <div>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}        
            >
                {
                    img.map((imageItemLink, index) => {
                        return (
                            <img 
                                key={index} 
                                src={imageItemLink} 
                                alt={`Carousel Item ${index}`} 
                            />
                        )
                    })  
                }
            </Carousel>
            <div className={classes.hero__img}></div>
        </div>
    )
}

export default CarouselEffect;