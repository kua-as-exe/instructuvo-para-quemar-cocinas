import React from 'react'
import { Container, Section, Box, Hero, Heading } from './../../components/shared/Bluma';
import Tiles from './Tiles';
import Welcome from './Welcome';

export default function HomePage() {
    return (
        <Section>
            <Container>
                <Hero color="primary" >
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
                <Welcome/>

                </Box>
            </Container>
        </Section>
    )
}
