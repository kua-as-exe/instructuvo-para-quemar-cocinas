import React from 'react'
import PropTypes from 'prop-types'

import { Container, Columns, Heading, Content, Image, Tag, Card, Box } from '../../../components/shared/Bluma'

import { Link, useRouteMatch } from "react-router-dom";

function DishItem({dishData, showImg = true}) {
    let match = useRouteMatch();
    const urlLink = `recetas/${dishData.url}`;

    const getTags = () => 
        dishData.tags.map( tag => (
            <Tag key={tag}>{tag}</Tag>
        ))
    

    return (
        <Box>
        <Container className="">
            <Columns>
                {showImg && <Columns.Column size={3}>
                    <Link to={urlLink}>
                    <Image 
                            src={dishData.img.url}
                            size='4by3'
                            ></Image>

                    </Link>
                </Columns.Column>}
                <Columns.Column size={9}>
                    <Content>
                        <Heading style={{'marginBottom': '0px'}} size={5}>{dishData.title}</Heading>
                        <Heading subtitle size={6} renderAs="span">
                            {dishData.author}
                        </Heading>
                        <p>{dishData.description}</p>
                        {/* <small>{dishData.fecha}</small> */}
                        <Tag.Group>
                            {getTags()}
                        </Tag.Group>

                    </Content>
                </Columns.Column>
            </Columns>
        </Container>
        </Box>
    )
}

DishItem.propTypes = {
    dishData: PropTypes.object
}

export default DishItem

