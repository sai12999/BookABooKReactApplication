import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { bookType } from '../BooksComponent/BookComponent/BookComponent';
import ButtonComponent from '../Utilities/ButtonComponent'
import classes from './BookOverviewComponent.module.css';

const BookOverviewComponent = () => {

    const params = useParams<{ id: string }>();
    const history = useHistory();
    const initialState = {
        name: "",
        id: -1,
        imgpath: "",
        author: "",
        price: -1,
        description: "",
        ISBN: "",
        pagecount: -1
    }
    let [bookOverviewState, setBookOverviewState] = useState<{ book: bookType }>({ book: initialState });

    useEffect(() => {
        fetch(`http://localhost:3004/books/${params.id}`)
            .then(resp => resp.json())
            .then(book => setBookOverviewState((prevState) => {
                let newstate = { ...prevState };
                newstate.book = book;
                return newstate;
            }))
    }, [params])

    let path = 'loading.png';

    if (bookOverviewState.book.imgpath !== "") {
        path = bookOverviewState.book.imgpath;
    }

    const addToCartHandler = async function (id: number) {
        await fetch(`http://localhost:3004/books?id=${id}`)
            .then(resp => resp.json())
            .then(respjson => {
                fetch(`http://localhost:3004/cart`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(respjson[0])
                })
                    .then(resp => alert("added to cart successfully"));
            })
            .catch(error => console.log(error.info));
    }

    const buyNowHandler = function (id: number) {
        addToCartHandler(id).then(resp => {
            history.push(`/checkout`)
        });

    }

    return (
        <React.Fragment>
            <div className={classes.bookimg}>
                <img src={require(`../../static/media/${path}`)} alt="book" />
            </div>
            <div className={classes.bookInfo}>
                <div>
                    <h1>{bookOverviewState.book.name}</h1>
                    <p><b>Book Price</b> : {bookOverviewState.book.price}</p>
                    <p><b>Author name</b> : {bookOverviewState.book.author}</p>
                    <p><b>Page Count</b> : {bookOverviewState.book.pagecount}</p>
                    <p><b>ISBN</b> : {bookOverviewState.book.ISBN}</p>
                </div>
                <div>
                    <ButtonComponent clickHandler={addToCartHandler} id={bookOverviewState.book.id}>Add To Cart</ButtonComponent>
                    <ButtonComponent clickHandler={buyNowHandler} id={bookOverviewState.book.id}>BuyNow</ButtonComponent>
                </div>
                <div>
                    <textarea rows={10} className={classes.desc} value={bookOverviewState.book.description} readOnly></textarea>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookOverviewComponent;