import React from 'react'

import Card from 'react-bulma-components/lib/components/card';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import Content from 'react-bulma-components/lib/components/content';


export default function CardComponent({title, img, user, showUser = false, date, children}) {
    const getCardHeader = () => {
        if(user && showUser){
            return (
                <Media>
                    { (user.img?.src)? 
                        (   <>
                                <Media.Item renderAs="figure" position="left">
                                    <Image size={64} alt="64x64" src={user.img.src} />
                                </Media.Item>
                                <Media.Item>
                                    <Heading size={4}>{user.name}</Heading>
                                    <Heading subtitle size={6}>{user.data}</Heading>
                                </Media.Item>
                            </>
                        ): 
                        (
                            <>
                                <Media.Item>
                                    <Heading size={4}>{title?title: user.name}</Heading>
                                    <Heading subtitle size={6}>{user.data}</Heading>
                                </Media.Item>
                            </>
                        )
                    }
                </Media>
            )
        }else{
            return (
                <Heading size={4}>{title}</Heading>
            )
        }
    }

    return (
        <Card>
            { img?.src? 
                <Card.Image size="4by3" src={img.src} />
                : <></>}
            <Card.Content>
                { getCardHeader() }
                <Content>
                    {children}
                    <br />
                    { date? <time dateTime="2016-1-1">{date}</time>: <></>}
                    {/*<time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>*/}
                </Content>
            </Card.Content>
        </Card>
    )
}
