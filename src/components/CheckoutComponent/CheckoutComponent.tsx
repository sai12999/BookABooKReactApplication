import React, { useState, useEffect } from 'react';
import classes from './CheckoutComponent.module.css';
import ButtonComponent from '../Utilities/ButtonComponent';
import { bookType } from '../BooksComponent/BookComponent/BookComponent';
import { useHistory } from 'react-router';

interface checkoutStateType {
    isDisabled: boolean,
    btnMsg: string,
    name: string,
    phoneNumber: string,
    street: string,
    pincode: string,
    cartItems: bookType[],
}

const CheckoutComponent = () => {
    let [checkoutState, setCheckoutState] = useState<checkoutStateType>({
        isDisabled: false,
        btnMsg: `save address`,
        name: '',
        phoneNumber: '',
        street: '',
        pincode: '',
        cartItems: [],
    });

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3004/cart`)
            .then(cartItems => cartItems.json())
            .then(cartItemsJson => setCheckoutState((prevState) => {
                let newState = { ...prevState };
                newState.cartItems = cartItemsJson;
                return newState;
            }))
            .catch(err => console.log(err.info));
    }, [])

    const validateForm = function () {
        let invalidFields: string[] = [];
        Object.entries(checkoutState).forEach(entry => {
            let value = entry[1];
            switch (entry[0]) {
                case "name":
                    if (!isNaN(Number(value)) || value.length < 3)
                        invalidFields.push(entry[0]);
                    break;
                case "phoneNumber":
                    if (isNaN(Number(value)) || String(value).length !== 10)
                        invalidFields.push(entry[0]);
                    break;
                case "street":
                    if (!isNaN(Number(value)) || value.length < 3)
                        invalidFields.push(entry[0]);
                    break;
                case "pincode":
                    if (isNaN(Number(value)) || String(value).length !== 6)
                        invalidFields.push(entry[0]);
                    break;
            }
        });
        return invalidFields;
    }

    const toggleButtonState = function () {
        let invalidFields = validateForm();
        if (invalidFields.length === 0) {
            let flagToDetectEmptyForm = false;
            Object.values(checkoutState).forEach(objProp => {
                if (typeof (objProp) === 'string' && objProp === '')
                    flagToDetectEmptyForm = true;
            })
            if (!flagToDetectEmptyForm)
                setCheckoutState((prevState) => {
                    let nextState = { ...prevState };
                    if (prevState.isDisabled) {
                        nextState.isDisabled = false;
                        nextState.btnMsg = `save address`;
                    }
                    else {
                        nextState.isDisabled = true;
                        nextState.btnMsg = `edit address`;
                    }
                    return nextState;
                })
            else
                alert("please fill address before saving!");
        }
        else callAlertWithInvalidFields(invalidFields);
    }

    const updateFields = function (e: any) {
        e.persist();
        setCheckoutState((prevState) => {
            let newState = { ...prevState };
            switch (e.target.id) {
                case "name":
                    newState.name = e.target.value;
                    break;
                case "phoneNumber":
                    newState.phoneNumber = e.target.value;
                    break;
                case "street":
                    newState.street = e.target.value;
                    break;
                case "pincode":
                    newState.pincode = e.target.value;
                    break;
            };
            return newState;
        });
    }

    const callAlertWithInvalidFields = function (invalidFields: string[]) {
        alert(`Following are invalid fields : ${invalidFields}`);
    }

    const shipItemHandler = function () {
        let invalidFields = validateForm();
        if (invalidFields.length === 0 && checkoutState.cartItems.length !== 0) {
            fetch(`http://localhost:3004/orders`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...checkoutState.cartItems })
            })
                .then(resp => {
                    alert("order placed successfully");
                    let idString = ``;
                    checkoutState.cartItems.forEach(item => idString = idString + `${item.id}` + ',');
                    idString = idString.substring(0, idString.length - 1);
                    fetch(`http://localhost:3004/cart/${idString}`, {
                        method: "DELETE",
                        body: JSON.stringify([])
                    }).then(response => history.push("/"));
                })
                .catch(error => console.log(error.info));;
        }
        else if (checkoutState.cartItems.length === 0) {
            alert("please add items to cart");
        }
        else callAlertWithInvalidFields(invalidFields);
    }

    return (
        <div className={classes.checkoutContainer}>
            <div className={classes.col1}>
                <h3 style={{ textDecoration: "underline" }}>Shipping Address</h3>
                <form>
                    <label>Name : </label><br />
                    <input type="text" id="name" value={checkoutState.name} onChange={updateFields} required disabled={checkoutState.isDisabled} placeholder="Your name min 3 characters" /><br />
                    <label>Phone Number : </label><br />
                    <input type="text" id="phoneNumber" value={checkoutState.phoneNumber} onChange={updateFields} required disabled={checkoutState.isDisabled} placeholder="10 digit mobile number" /><br />
                    <label>Street : </label><br />
                    <input type="text" id="street" value={checkoutState.street} onChange={updateFields} required disabled={checkoutState.isDisabled} placeholder="street name min 3 characters" /><br />
                    <label>Pincode : </label><br />
                    <input type="text" id="pincode" value={checkoutState.pincode} onChange={updateFields} required disabled={checkoutState.isDisabled} placeholder="6 digit pincode" />
                </form>
                <br />
                <ButtonComponent clickHandler={toggleButtonState}>{checkoutState.btnMsg}</ButtonComponent>
            </div>
            <div className={classes.col2}>
                <h3 style={{ textDecoration: "underline" }}>Shopping Bag</h3>
                {checkoutState.cartItems.map(item => {
                    return (
                        <React.Fragment key={item.id}>
                            <p>{item.name} : {item.price}</p>
                        </React.Fragment>
                    )
                })}
                <h4>total : {checkoutState.cartItems.length > 0 ? checkoutState.cartItems.map(item => item.price).reduce((a, b) => a + b) : 0}</h4>
                <ButtonComponent clickHandler={shipItemHandler}>Proceed To Shipping</ButtonComponent>
            </div>
        </div>
    );
}

export default React.memo(CheckoutComponent);