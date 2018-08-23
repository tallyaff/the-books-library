import React, { Component } from 'react';
import BooksService from '../../services/BooksService';
import BooksList from '../../Components/BooksList/BooksList';
import Modal from '../../Components/UI/Modal/Modal'
import Button from '../../Components/UI/Button/Button'
import Loader from '../../Components/UI/Loader/Loader'
import RemoveBookMsg from '../../Components/RemoveBookMsg/RemoveBookMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class BooksGallery extends Component {

    constructor(props) {
        super(props);
        this.editModeHandler = this.editModeHandler.bind(this);
        this.removeModeHandler = this.removeModeHandler.bind(this);
        this.editCancelHandler = this.editCancelHandler.bind(this);
        this.removeCancelHandler = this.removeCancelHandler.bind(this);
        this.btnRemoveHandler = this.btnRemoveHandler.bind(this);
        this.editSaveHandler = this.editSaveHandler.bind(this);
    }

    state = {
        books: [],
        editMode: false,
        removeMode: false,
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true })
        BooksService.getBooks()
            .then(books => {
                this.setState({ books, loading: false })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    editCancelHandler() {
        this.setState({ editMode: false, currBookId: null })
    }

    removeCancelHandler() {
        this.setState({ removeMode: false })
    }
    removeModeHandler(id) {
        this.setState({ removeMode: true, currBookId: id })
    }

    btnRemoveHandler() {
        BooksService.deleteBook(this.state.currBookId)
            .then(_ => {
                this.setState({ removeMode: false, currBook: null })
            })
    }

    editModeHandler(id) {
        const currBookId = id;
        this.setState({ currBookId, editMode: true })
    }


    editSaveHandler(bookToSave) {
        BooksService.saveBook(bookToSave)
            .then(book => {
                this.setState({ editMode: false })
            })

    }


    render() {
        if (this.state.loading) return <Loader />
        return (
            <React.Fragment>
                <Link to={`/book/edit/`}>
                    <Button btnType="IconAdd"
                    ><FontAwesomeIcon icon="plus">
                        </FontAwesomeIcon>  Add a book
                    </Button>
                </Link>
                <BooksList
                    books={this.state.books}
                    onEditMode={this.editModeHandler}
                    onRemoveMode={this.removeModeHandler}
                />
                <Modal
                    show={this.state.removeMode}
                >
                    <RemoveBookMsg
                        btnCancel={this.removeCancelHandler}
                        btnRemove={this.btnRemoveHandler}
                    />
                </Modal>

            </React.Fragment>
        )
    }
}

export default BooksGallery;