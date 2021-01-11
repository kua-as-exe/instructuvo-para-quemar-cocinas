import React from 'react'
import { getPageContent } from './url'
import IframeResizer from 'iframe-resizer-react'
import { useState } from 'react'


function Content({id}) {
    const [loading, setLoading] = useState(true)
    return (
        <div>
            { loading && <div>
                <button className="is-large button is-fullwidth is-loading disabled" style={{border: '0'}} />
            </div> }
            <IframeResizer
                checkOrigin={false}
                maxHeight="1000px"
                onLoad={()=>setLoading(false)}
                src={getPageContent(id)}
                style={{ width: "1px", minWidth: "100%", marginTop: '-3rem'}}/>
        </div>
    )
}

export default React.memo(Content)

