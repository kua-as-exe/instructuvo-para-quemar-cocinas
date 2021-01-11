import React from 'react'

export default function Loading() {
    return (
        <button 
            className="is-large button is-fullwidth is-loading disabled" 
            style={{
                border: '0',
                background: 'none'
            }} />
    )
}
