import React, { useEffect, useState } from 'react';
import BooksComponent from '../BooksComponent/BooksComponent'
import { bookType } from '../BooksComponent/BookComponent/BookComponent';

const HomeComponent = () => {

    let [booksState, setBooks] = useState<{ books: bookType[] }>({ books: [] });

    useEffect(() => {
        fetch('http://localhost:3004/books')
            .then(resp => resp.json())
            .then(books => setBooks((prevState) => {
                let newstate = { ...prevState };
                newstate.books = books;
                return newstate;
            }))
            .catch(error => console.log(error.info));;
    }, []);

    return (
        <BooksComponent books={booksState.books} />
    )
}

export default HomeComponent;