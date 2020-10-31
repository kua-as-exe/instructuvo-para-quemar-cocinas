import React from 'react'
import Container from 'react-bulma-components/lib/components/container';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';

export default function HomePage() {



    return (
       <Section>
            <Container>
                <Hero color="secondary" >
                    <Hero.Body>
                        <Container>
                            <Heading>
                                Instructivo para quemar cocinas
                            </Heading>
                            <Heading subtitle size={4}>
                                Tu CAS de tips y recetas de cocina con la calidad y sabor mexicano
                            </Heading>
                        </Container>
                    </Hero.Body>
                </Hero>
                <Box>
                    <h1>Ola</h1>
                </Box>
            </Container>
        </Section>
    )
}