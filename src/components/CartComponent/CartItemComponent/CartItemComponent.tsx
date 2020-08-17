import React from 'react';
import classes from './CartItemComponent.module.css';
import ButtonComponent from '../../Utilities/ButtonComponent';

const CartItemComponent = (props: any) => {
    return (
        <div className={classes.item}>
            <div className={classes.imgpath}><img src={require(`../../../static/media/${props.imgpath}`)} alt="Avatar" /></div>
            <div className={classes.iteminfo}>
                <h3>{props.name}</h3>
                <h4>{props.author}</h4>
                <h4>{props.price}</h4>
            </div>
            <ButtonComponent className={classes.btn} clickHandler={() => props.removeHandler(props.id)}>Remove</ButtonComponent>
        </div>
    )
}

export default CartItemComponent;