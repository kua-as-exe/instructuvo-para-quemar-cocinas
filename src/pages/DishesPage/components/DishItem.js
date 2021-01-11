import React from 'react'
import PropTypes from 'prop-types'

import { random, tagsColors } from '../../../utils/utils';

function DishItem({dishData, showImg = true, showAuthor = true, select = ()=>{}}) {
    
    const getTags = () => 
        dishData.Tags.map( tag => (
            <div className={`tag ${random(tagsColors)}`} key={tag}>{tag}</div>
        ))
    

    return (
        // eslint-disable-next-line
        <a className="box">
        <div className="container" onClick={()=>select(dishData)}>
            <div className="columns">
                {showImg && <div className="column is-3">
                    
                    {/* <Image 
                        src={dishData.img.url}
                        size='4by3'
                        ></Image> */}

                    
                </div>}
                <div className="column">
                    <div className="content">
                        <p className="title is-5" style={{'marginBottom': '0px'}}>{dishData.Name}</p>
                        {showAuthor && <span className="subtitle is-6">
                            {dishData.author}
                        </span>}
                        <p>{dishData.Descripción}</p>
                        {/* <small>{dishData.fecha}</small> */}
                        {dishData.Tags && <div className="tags">
                            {getTags()}
                        </div>}

                    </div>
                </div>
            </div>
        </div>
        </a>
    )
}

DishItem.propTypes = {
    dishData: PropTypes.object
}

export default React.memo(DishItem, ()=> true)

