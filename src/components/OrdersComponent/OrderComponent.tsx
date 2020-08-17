import React, { useEffect, useState } from 'react';
import classes from './OrderComponent.module.css';
import { bookType } from '../BooksComponent/BookComponent/BookComponent';


interface MyType {
    [key: string]: bookType | number;
}

const OrdersComponent = () => {
    let [ordersState, setOrdersState] = useState<[MyType]>([{}])

    useEffect(() => {
        fetch(`http://localhost:3004/orders`)
            .then(resp => resp.json())
            .then(jsonresp => setOrdersState(jsonresp))
            .catch(error => console.log(error.info));
    }, [])

    return (
        <div>
            {ordersState.length > 0 ? ordersState.map((order, index) => {
                let orderTotal: number[] = [];
                let names: string[] = [];
                Object.entries(order).forEach(orderItem => {
                    if (orderItem[0] !== "id") {
                        if (typeof (orderItem[1]) === "object") {
                            orderTotal.push(orderItem[1].price);
                            names.push(orderItem[1].name);
                        }
                    }
                })
                const total: number = orderTotal.length > 0 ? orderTotal.reduce((a, b) => a + b) : 0;

                return <ul key={index} className={classes.list}>
                    {
                        names.map((name, index) => <li key={name}><h3>{name}</h3></li>)
                    }
                    Total : {total}
                </ul>
            }) : ""
            }
        </div>
    )
}

export default OrdersComponent;