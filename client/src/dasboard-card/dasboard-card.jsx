import React from 'react'
import './dasboard-card.css'
const DasboardCard = ({ headline, text }) => {
    return (
        <div className='dasboard-card'>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center' }}>{headline}</p>

            <p style={{ fontSize: '2rem', fontWeight: '500', textAlign: 'center' }}>{text}</p>

        </div>
    )
}

export default DasboardCard;
