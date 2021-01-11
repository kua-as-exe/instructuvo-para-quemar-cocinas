import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';

//import { dishesData } from '../../../data/dishes.js'
import { uniqueName, removeAccents } from '../../../utils/utils.js';
import DishItem from './DishItem.js';

const url = (dish) => uniqueName(dish.Name);

function DishesList({ dishes = {}, filters = {}, prefix = "", select = ()=>{}}) {

    const [DishList, setDishList] = useState([])

    useEffect(() => {
        console.log(dishes && dishes.map(a => url(a)))
        console.log(dishes)
        if(prefix !== ""){
            let newPrefix = removeAccents(prefix.toLowerCase());
            let words = newPrefix.split(' ');
            // console.log(words)
            let tempDishes = dishes.map( dish => {
                let points = 0;
                let title = dish.Name.toLowerCase();
                title = removeAccents(title);
                let wordsTitle = title.split(' ');
                
                dish.Tags = dish.Tags.map(tag => tag.toLowerCase());
                words.forEach( word => {
                    if(word === '') return;
                    points += wordsTitle.filter(wT => wT.includes(word)).length;
                    if(dish.Tags){
                        points += dish.Tags.filter(tag => tag.includes(word)).length;
                    }
                });

                dish.points = points;
                return dish;
            }).filter( dish => dish.points > 0)
            tempDishes = tempDishes.sort((dishA, dishB)=> {
                if (dishA.points < dishB.points) return 1;
                if (dishA.points > dishB.points) return -1;
                return 0;
            })
            // dishes.forEach( dish => console.log(dish.title, dish.points))
            setDishList(tempDishes);
            //DishList.forEach(dish => console.log(dish.title, dish.points));
        }else{
            setDishList(dishes);
        }
    }, [prefix, dishes])

    return <>
        {DishList.map( dish => (
            <DishItem
                select={select}
                showImg={false}
                showAuthor={false}
                key={dish.id} 
                dishData={dish}/>
        ))}
    	{DishList.length === 1 && 
            <Redirect to={'/recetas/'+DishList[0].url}/>
        }
        {DishList.length === 0 && 
            <h1>No hay, no existe</h1>
        }
    </>
}

export default React.memo(DishesList)

