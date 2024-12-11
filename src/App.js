import './App.css'
import React, { useContext, useEffect } from'react'
import Routing from './Router'
import Header from './Components/Header/Header'
import Carousel from './Components/Carousel/Carousel'
import Category from './Components/Category/Category'
import Product from './Components/Products/Product'
import { DataContext } from './Components/Data Provider/DataProvide'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'


function App() {
const [{user}, dispatch] = useContext(DataContext)

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser,
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        })
      }
    })

  },[])


  return <Routing/>;  
}

export default App;
