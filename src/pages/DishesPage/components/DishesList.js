import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';

import { dishesData } from '../../../data/dishes.js'
import DishPage from '../../DishPage/DishPage.js';
import DishItem from './DishItem.js';

const removeAccents = (str) =>  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


function DishesList({filters = {}, prefix = "", select = ()=>{}}) {

    const [DishList, setDishList] = useState(dishesData)

    useEffect(() => {
        if(prefix !== ""){
            prefix = removeAccents(prefix.toLowerCase());
            let words = prefix.split(' ');
            // console.log(words)
            let dishes =  dishesData.map( dish => {
                let points = 0;
                let title = dish.title.toLowerCase();
                title = removeAccents(title);
                let wordsTitle = title.split(' ');
                
                dish.tags = dish.tags.map(tag => tag.toLowerCase());
                words.forEach( word => {
                    if(word === '') return;
                    points += wordsTitle.filter(wT => wT.includes(word)).length;
                    if(dish.tags){
                        points += dish.tags.filter(tag => tag.includes(word)).length;
                    }
                });

                dish.points = points;
                return dish;
            }).filter( dish => dish.points > 0)
            dishes = dishes.sort((dishA, dishB)=> {
                if (dishA.points < dishB.points) return 1;
                if (dishA.points > dishB.points) return -1;
                return 0;
            })
            // dishes.forEach( dish => console.log(dish.title, dish.points))
            setDishList(dishes);
            //DishList.forEach(dish => console.log(dish.title, dish.points));
        }else{
            setDishList(dishesData);
        }
    }, [prefix])

    return <>
        {DishList.map( dish => (
            <DishItem
                select={select}
                showImg={false}
                showAuthor={false}
                key={dish.title} 
                dishData={dish}/>
        ))}
    	{DishList.length === 1 && 
            <Redirect to={'/recetas/'+DishList[0].url}/>
        }
        {DishList.length === 0 && 
            <h1>No hay no existe</h1>
        }
    </>
}

export default DishesList

