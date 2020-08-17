import React from 'react';

interface textAreaPropsType {
    isDisabled: boolean,
    rows: number,
    cols?: number
}

const TextAreaCompponent = (props: textAreaPropsType) => {
    return (
        <textarea rows={props.rows} cols={props.cols} disabled={props.isDisabled}></textarea>
    )
}

export default TextAreaCompponent;