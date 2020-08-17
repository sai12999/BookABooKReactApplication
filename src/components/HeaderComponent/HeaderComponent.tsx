import React from 'react';
import classes from './HeaderComponent.module.css';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div className={classes.pageheader}>
            <span>Book-A-Book</span>
            <div className={classes.headernav}>
                <NavLink to={{ pathname: '/' }} exact={true} activeClassName={classes.activeMenu} >Home</NavLink>
                <NavLink to={{ pathname: '/orders' }} exact={true} activeClassName={classes.activeMenu}>MyOrders</NavLink>
                <NavLink to={{ pathname: '/cart' }} exact={true} activeClassName={classes.activeMenu}>Cart</NavLink>
                <NavLink to={{ pathname: '/checkout' }} exact={true} activeClassName={classes.activeMenu}>Checkout</NavLink>
            </div>
        </div>
    )
}

export default HeaderComponent;