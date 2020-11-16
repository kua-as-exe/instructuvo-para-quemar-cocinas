import React, {useState} from 'react'
import EditorJs from 'react-editor-js';
import { Button, Container, Content } from '../../components/shared/Bluma';
import { EDITOR_JS_TOOLS } from '../../components/shared/EditorJsTools';
import './editor.css';

let editorInstance = {};

export default function EditorPage() {

    const [readOnly, setreadOnly] = useState(false)
    const [data, setdata] = useState({
        time: 1556098174501,
        blocks: [
        
        ],
        version: "2.12.4"
    })

    const handleSave = async () => {
        console.log(editorInstance)
        setdata(await editorInstance.save());
        console.log(data);
    }

    return (
        <Container>
            <h1>Editor</h1>
            <Button onClick={ () => {setreadOnly(!readOnly)} }>Solo lectura: {readOnly?'si':'no'}</Button>
            <Content>
                <EditorJs
                    placeholder="Comienza a escribir aquí"
                    readOnly={readOnly}
                    logLevel="ERROR"
                    data={data} 
                    tools={EDITOR_JS_TOOLS} 
                    instanceRef={instance => editorInstance = instance} 
                    />;

            </Content>
            <Button onClick={ handleSave }>Guardar</Button>
            <pre>
                {JSON.stringify(data, undefined, 4)}
            </pre>
        </Container>
    )
}
