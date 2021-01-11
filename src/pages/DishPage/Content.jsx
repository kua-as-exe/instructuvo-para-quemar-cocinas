import React from 'react'
import PropTypes from 'prop-types'
import useApi from 'use-http-api'
import { getPageContent } from './url'
import { useRef } from 'react'
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

Content.propTypes = {

}

export default React.memo(Content)

