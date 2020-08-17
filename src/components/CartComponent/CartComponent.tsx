import React, { useEffect, useState } from 'react';
import CartItemComponent from './CartItemComponent/CartItemComponent';
import { bookType } from '../BooksComponent/BookComponent/BookComponent';
import classes from './CartItemComponent/CartItemComponent.module.css';

const CartComponent = () => {
    let [cartState, setCartState] = useState<bookType[]>([]);
    useEffect(() => {
        let idQuery = ``;
        fetch(`http://localhost:3004/cart`)
            .then(resp => resp.json())
            .then(jsonResp => {
                for (let obj in Object.values(jsonResp)) {
                    idQuery = idQuery + `id=${jsonResp[obj].id}&`
                }
                if (idQuery !== ``)
                    fetch(`http://localhost:3004/books?` + idQuery)
                        .then(cartItems => cartItems.json())
                        .then(cartItemsJson => {
                            setCartState(cartItemsJson)
                        });
            })
            .catch(error => console.log(error.info));
    }, [])

    const removeCartItemHandler = function (id: number) {
        fetch(`http://localhost:3004/cart/${id}`, {
            method: "DELETE"
        })
            .then(res => setCartState((prevState) => {
                let newState = [...prevState];
                return newState.filter(cartItem => cartItem.id !== id);
            }))
            .catch(error => console.log(error.info));
    }

    return (
        <div className={classes.cartContainer}>
            {cartState.map(book =>
                <CartItemComponent
                    key={book.id}
                    name={book.name}
                    author={book.author}
                    price={book.price}
                    id={book.id}
                    imgpath={book.imgpath}
                    removeHandler={removeCartItemHandler}
                />)
            }
        </div>
    )
}

export default CartComponent;

