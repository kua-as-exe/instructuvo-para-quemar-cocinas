import React from 'react'
// import PropTypes from 'prop-types'
import { getPageMinimalContent } from '../../DishPage/url'
import ReactHtmlParser from 'react-html-parser';
import useApi from 'use-http-api';
import { random, tagsColors } from '../../../utils/utils';
import Loading from '../../../components/shared/Loading';

function Tip({color, id, Name, Autor}) {
    const [{data:html, error, loading, initialLoad}, getTipData] = useApi({
        url: getPageMinimalContent(id),
        autoTrigger: true, defaultData: []
    })
    if(!color) color = random(tagsColors)
    return (
        <section className={`hero is-medium ${color} is-bold`}>
            <div className="hero-body">
            <div className="container">
                <h1 className="title"> {Name} </h1>
                <h1 className="subtitle is-5"> {Autor} </h1>
                {
                    loading || initialLoad?
                    <Loading/>:
                    error?
                    <div>Error: {error}</div>:
                    <div>
                        {ReactHtmlParser(html)}
                    </div>
                }
            </div>
            </div>
        </section>
    )
}

export default React.memo(Tip)

