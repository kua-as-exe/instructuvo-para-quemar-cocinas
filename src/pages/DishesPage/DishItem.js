import React from 'react'
import PropTypes from 'prop-types'

import { Container, Columns, Heading, Content, Image, Tag } from '../../components/shared/Bluma'

import { dishesData } from '../../data/dishes.js'

function DishItem({dishData = dishesData[0]}) {
    const getTags = () => 
        dishData.tags.map( tag => (
            <Tag key={tag}>{tag}</Tag>
        ))
    

    return (
        <Container className="animate__animated animate__fadeIn animate__faster">
            <Columns>
                <Columns.Column size={3}>
                   <Image 
                        src={dishData.img.url}
                        size='4by3'
                        ></Image>

                </Columns.Column>
                <Columns.Column size={9}>
                    <Content>
                        <Heading style={{'marginBottom': '0px'}} size={5}>{dishData.title}</Heading>
                        <Heading subtitle size={6} renderAs="span">
                            {dishData.author}
                        </Heading>
                        <p>{dishData.description}</p>
                        <small>{dishData.fecha}</small>
                        <br/>
                        <Tag.Group>
                            {getTags()}
                        </Tag.Group>

                    </Content>
                </Columns.Column>
            </Columns>
        </Container>
    )
}

DishItem.propTypes = {
    dishData: PropTypes.object
}

export default DishItem

