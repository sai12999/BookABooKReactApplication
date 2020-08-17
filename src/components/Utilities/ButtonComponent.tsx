import React from 'react';
import classes from './ButtonComponent.module.css';

const ButtonComponent = (props: any) => {
    return (
        <button className={classes.btn} onClick={() => props.clickHandler(props.id)}>{props.children}</button>
    );
}

export default ButtonComponent;