import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import BooksService from '../../services/BooksService'
import Modal from '../../Components/UI/Modal/Modal'
import './EditBook.css'


class editBook extends Component {

    constructor(props) {
        super(props);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    state = {
        book: {
            volumeInfo: {
                imageLinks: {
                    thumbnail: '',
                },
                authors: [],
                publishedDate: '',
                title: '',
            }
        },
        isExistTitle: false,
        SubmitError: false,
        titleValid: true,
        dateValid: true,
        authorsValid: true,
        formValid: true,
    }

    checkValidity(value, name) {
        const date = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
        if (name === 'publishedDate') {
            if (value && !value.match(date)) {
                this.setState({ dateValid: false, formValid: false });
            } else if (value.trim() === '') {
                this.setState({ dateValid: false, formValid: false });
            } else {
                this.setState({ dateValid: true, formValid: true });
            }
        } else {
            if (name === 'title') {
                if (value.trim() === '') {
                    this.setState({ titleValid: false, formValid: false });
                } else {
                    this.setState({ titleValid: true, formValid: true });
                }
            } if (name === 'authors') {
                if (value.trim() === '') {
                    this.setState({ authorsValid: false, formValid: false });
                } else {
                    this.setState({ authorsValid: true, formValid: true });
                }
            }
        }

    }

    componentDidMount() {
        if (this.props.match) {
            const bookId = this.props.match.params.id;
            if (bookId) {
                BooksService.getBookById(this.props.match.params.id)
                    .then(book => {
                        this.setState({ book, isHaveId: true }, () => {
                        });
                    });
            }
        }
    }

    cancelEdit() {
        this.props.history.push("/");
    }

    onChangeHandler(event) {
        let book = JSON.parse(JSON.stringify(this.state.book));
        if (event.target.name === 'authors') {
            book.volumeInfo[event.target.name] = event.target.value.split(',');
        } else {
            book.volumeInfo[event.target.name] = event.target.value;
        }
        let formValid = this.checkValidity(event.target.value, event.target.name)
        this.setState({ book });
    }

    submitHandler(event) {
        event.preventDefault();
        if (!this.state.formValid) { this.setState({ SubmitError: true }); return }
        this.setState({ isExistTitle: false })
        let isExistTitle = BooksService.isExistTitle(this.state.book.volumeInfo.title)
        if (isExistTitle) {
            this.setState({ isExistTitle: true })
            return;
        }
        let bookToSave = { ...this.state.book }
        BooksService.saveBook(bookToSave)
            .then(book => {
                this.setState({ titleValid: true, dateValid: true, authorsValid: true, formValid: true })
                this.props.history.push("/");
            })
    }

    render() {
        let publishedDate = '00/00/0000';
        if (this.state.book.volumeInfo.publishedDate) {
            publishedDate = this.state.book.volumeInfo.publishedDate.split("-").reverse().join("/")
        }
        return (
            <React.Fragment>
                <Modal show>
                    {this.state.book.id ? <div className="FormTitle">Edit Your Book</div> : <div className="FormTitle">Add Your Book</div>}
                    <form onSubmit={this.submitHandler}>
                        {this.state.book.id && <Input label="ID" type="text" name="id" disabled value={this.state.book.id} />}

                        <Input type="text" name="authors"
                            invalid={this.state.authorsValid ? 'false' : 'true'}
                            value={this.state.book.volumeInfo.authors}
                            onChange={(event) => this.onChangeHandler(event)}
                            label="author"
                            onBlur={(event) => this.checkValidity(event.target.value, event.target.name)}
                        />
                        <Input type="text" name="publishedDate"
                            invalid={this.state.dateValid ? 'false' : 'true'}
                            value={publishedDate}
                            onChange={(event) => this.onChangeHandler(event)}
                            label="published date"
                            onBlur={(event) => this.checkValidity(event.target.value, event.target.name)}
                        />
                        <Input type="text" name="title"
                            invalid={this.state.titleValid ? 'false' : 'true'}
                            value={this.state.book.volumeInfo.title}
                            onChange={(event) => this.onChangeHandler(event)}
                            label="title"
                            onBlur={(event) => this.checkValidity(event.target.value, event.target.name)}
                        />
                        <Button btnType="Success" type="submit" name="btnsave" clicked={this.submitHandler}>SAVE</Button>
                        {this.state.SubmitError && <div className="SubmitError" >Please fill all the fields</div>}
                        {this.state.isExistTitle && <div className="SubmitError" >Title already taken!</div>}
                    </form>
                    <Button invalid={false} btnType="Danger" name="btnCancel" clicked={this.cancelEdit} >CANCEL</Button>
                </Modal>
            </React.Fragment>
        )

    }
}

export default editBook;