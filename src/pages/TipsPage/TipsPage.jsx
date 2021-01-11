import React from 'react';

import ReactGA from 'react-ga';
import useApi from 'use-http-api';
import LoadingTips from './LoadingTips';
import Tip from './Tip/Tip';
import './Tips.css'

const TipsPage = () => {
    
    const [{data:tips, error, loading, initialLoad}, getTips] = useApi({
        url: 'https://detech-notionapi.netlify.app/.netlify/functions/getCollectionData?id=ff9f8403b6e442e882acf5d2ec42401b',
        autoTrigger: false, defaultData: []
    })
    React.useEffect( () => {
        console.log("TipsPage");
        ReactGA.pageview('/recetas');
        getTips();
    }, [])
    // console.log("A")
    return (
        <div>
            {
                loading || initialLoad? 
                <LoadingTips/>:
                error?
                <div>error</div>:
                tips.map(tipData => (
                    <Tip key={tipData.id} {...tipData}/>
                ))
            }
           {/* <pre>{JSON.stringify(tips, null, 2)}</pre> */}
        </div>
    )
}

export default TipsPage;