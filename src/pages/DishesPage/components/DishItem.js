import React from 'react'
import PropTypes from 'prop-types'

import { random, tagsColors } from '../../../utils/utils';
import { Container, Columns, Heading, Content, Image, Tag, Card, Box } from '../../../components/shared/Bluma'
import { FaClock, FaTimes } from 'react-icons/fa';

function DishItem({dishData, showImg = true, showAuthor = true, select = ()=>{}}) {
    
    const getTags = () => 
        dishData.tags.map( tag => (
            <div className={`tag ${random(tagsColors)}`} key={tag}>{tag}</div>
        ))
    

    return (
        <a className="box" >
        <div className="container" onClick={()=>select(dishData)}>
            <Columns>
                {showImg && <Columns.Column size={3}>
                    
                    <Image 
                            src={dishData.img.url}
                            size='4by3'
                            ></Image>

                    
                </Columns.Column>}
                <Columns.Column>
                    <Content>
                        <Heading style={{'marginBottom': '0px'}} size={5}>{dishData.title}</Heading>
                        {showAuthor && <Heading subtitle size={6} renderAs="span">
                            {dishData.author}
                        </Heading>}
                        <p>{dishData.description}</p>
                        {/* <small>{dishData.fecha}</small> */}
                        {dishData.tags && <Tag.Group>
                            {getTags()}
                        </Tag.Group>}

                    </Content>
                </Columns.Column>
            </Columns>
        </div>
        </a>
    )
}

DishItem.propTypes = {
    dishData: PropTypes.object
}

export default React.memo(DishItem, ()=> true)

