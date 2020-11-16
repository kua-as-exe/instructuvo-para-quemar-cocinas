import React from 'react'
import PropTypes from 'prop-types'

import { Container, Columns, Heading, Content, Image, Tag, Card, Box } from '../../../components/shared/Bluma'

import { Link, useRouteMatch } from "react-router-dom";

function DishItem({dishData, showImg = true, showAuthor = true}) {
    let match = useRouteMatch();
    const urlLink = `/recetas/${dishData.url}`;
    const getTags = () => 
        dishData.tags.map( tag => (
            <Tag key={tag}>{tag}</Tag>
        ))
    

    return (
        <Box>
            <Link to={urlLink}>
        <Container className="">
            <Columns>
                {showImg && <Columns.Column size={3}>
                    
                    <Image 
                            src={dishData.img.url}
                            size='4by3'
                            ></Image>

                    
                </Columns.Column>}
                <Columns.Column size={9}>
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
        </Container>
        </Link>
        </Box>
    )
}

DishItem.propTypes = {
    dishData: PropTypes.object
}

export default DishItem

