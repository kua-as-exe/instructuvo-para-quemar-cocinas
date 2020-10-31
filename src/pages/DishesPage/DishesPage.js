import React, {useState} from 'react'
import { Section, Container, Box, Columns, Heading } from '../../components/shared/Bluma'
import DishesList from './DishesList';
//const { Input, Field, Control, Label } = Form;

import { FaSearch } from 'react-icons/fa';


export default function HomePage() {

    const [searchPrefix, changeSearchPrefix] = useState("")

    const handleKeyPress = (e) => {
        if(e.which === 13){
            console.log(searchPrefix);
        }
    }
    const handleChange = (e) => {
        changeSearchPrefix(e.target.value);
    }

    const searchBox = () => (
        <div className="field">
            <div className="control has-icons-left">
                <input 
                    className="input is-large" 
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    type="text" 
                    placeholder="Buscar"/>

                <span className="icon is-left">
                    {/**<i className="fas fa-envelope fa-sm"></i>**/}
                    <FaSearch/>
                </span>
            </div>
        </div>
    )

    return (
       <Section>
            <Container>
                <Columns>
                    <Columns.Column size={3}>
                        <Box>
                            <Heading size={4}>Recetas</Heading>
                        </Box>
                    </Columns.Column>
                    <Columns.Column size={9}>
                        
                            {searchBox()}
                        
                    </Columns.Column>
                </Columns>
            </Container>
            <Container>
                <Columns>
                    <Columns.Column size={3}>
                        <Box>
                            <h1>Ola</h1>
                        </Box>
                    </Columns.Column>
                    <Columns.Column size={9}>
                        <Box>
                            <DishesList prefix={searchPrefix}/>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    )
}