import React from 'react'


export default function CardComponent({title, img, user, showUser = false, date, children}) {
    /* const getCardHeader = () => {
        if(user && showUser){
            return (
                <div className="media">
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
                </div>
            )
        }else{
            return (
                <Heading size={4}>{title}</Heading>
            )
        }
    }

    return (
        <div className="card">
            { img?.src? 
                <Card.Image size="4by3" src={img.src} />
                : <></>}
            <Card.Content>
                { getCardHeader() }
                <Content>
                    {children}
                    <br />
                    { date? <time dateTime="2016-1-1">{date}</time>: <></>}
                </Content>
            </Card.Content>
        </div>
    ) */
    return <></>
}
