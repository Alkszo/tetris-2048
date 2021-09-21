import React from 'react';

const Block = ({identifier, activity, value}) => {
    return(
        <div className={activity ? `block ${identifier} active v${value}` : `block ${identifier} v${value}`}>{value && <p>{value}</p>}</div>
    )
};

export default Block;