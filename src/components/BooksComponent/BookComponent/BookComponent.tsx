import React from 'react';
import classes from '../../BooksComponent/BookComponent/BookComponent.module.css';
import { Link } from 'react-router-dom';

export type bookType = {
    name: string;
    id: number;
    imgpath: string;
    description: string;
    price: number;
    author: string;
    ISBN: string;
    pagecount: number;
}

const Book = (props: bookType) => {
    return (
        <div className={classes.card}>
            <div><Link to={{ pathname: `book/${props.id}` }}>
                <img src={require(`../../../static/media/${props.imgpath}`)} alt="Avatar" />
            </Link></div>
            <div className={classes.container}>
                <Link to={{ pathname: `book/${props.id}` }} className={classes.buynow}>purchase</Link>
                <h4 className={classes.content}><b>{props.name} by {props.author}</b></h4>
            </div>
        </div>
    )
}

export default Book;
