import React from 'react';
import BookComponent, { bookType } from './BookComponent/BookComponent'
import classes from './BooksComponent.module.css';

interface booksPropsType {
    books: bookType[];
}

export type booksType = booksPropsType;

const Books = (props: booksType) => {
    const books = props.books.map((book: bookType) => <BookComponent
        key={book.id}
        name={book.name}
        id={book.id}
        imgpath={book.imgpath}
        description={book.description}
        author={book.author}
        price={book.price}
        ISBN={book.ISBN}
        pagecount={book.pagecount}
    />);
    return (
        <div className={classes.booksContainer}>
            {books}
        </div>
    )
}

export default Books;