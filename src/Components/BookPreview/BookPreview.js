import React from 'react';
import './BookPreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BooksService from '../../services/BooksService'


const bookPreview = ({ book: { volumeInfo, id } }) => {

    let authors = 'Unknown';
    if (volumeInfo.authors) { authors = volumeInfo.authors.join() }
    let publishedDate = '00/00/0000';
    if (volumeInfo.publishedDate) {
        publishedDate = volumeInfo.publishedDate.split("-").reverse().join("/")
    }
    let title = BooksService.getTitleFormat(volumeInfo.title)


        return  (

            <div className="BookPreview Flex Column SpaceBetween">
                <div className="BookTitle">{title}</div>
                <div className="ImgContainer">
                    <img src="https://www.graphicpear.com/wp-content/uploads/2016/12/4.jpg" alt={volumeInfo.title} />
                </div>
                <div className="TextContainer Flex Column SpaceEvenly">
                    <div><span className="FeatherIcon"><FontAwesomeIcon icon="feather-alt" /></span> {authors}</div>
                    <div><span className="DateIcon"><FontAwesomeIcon icon="calendar-alt" /></span>  {publishedDate}</div>
                    <div><span className="BarcodeIcon"><FontAwesomeIcon icon="barcode" /></span> {id}</div>
                </div>
            </div>

        )
}
export default bookPreview;
