import React from 'react';
import './BooksList.css'
import BookPreview from '../BookPreview/BookPreview';
import Button from '../UI/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const booksList = (props) => {

    return (
        <ul className="BooksList Flex Wrap">
            {props.books.map((book) => {
                return (
                    <li key={book.id}
                    >
                        <BookPreview book={book} />
                        <div className="IconsContainer Flex end">
                            <Button btnType="Icon"
                                clicked={() => props.onRemoveMode(book.id)}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </Button>
                            <Link to={`/book/edit/${book.id}`}>
                                <Button btnType="Icon">
                                    <FontAwesomeIcon icon="edit" />
                                </Button>
                            </Link>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default booksList;