import React, {useState, useEffect} from 'react'

import { dishesData } from '../../data/dishes.js'
import DishItem from './DishItem.js';

function DishesList({filters = {}, prefix = ""}) {

    const [DishList, setDishList] = useState(dishesData)

    useEffect(() => {
        if(prefix !== ""){
            setDishList(
                dishesData.filter( dish => 
                    dish.title.toLowerCase().includes(prefix.toLowerCase()) ||
                    dish.tags.filter(tag => tag.toLowerCase().includes(prefix.toLowerCase())).length > 0
                )
            );
        }else{
            setDishList(dishesData);
        }
        /*
        return () => {
            cleanup
        }
        */
    }, [prefix])

    return (
        <div>
            {
                DishList.map( dish => (
                    <DishItem key={dish.title} dishData={dish}/>
                ))
            }
        </div>
    )
}

export default DishesList

