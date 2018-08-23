import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout'
import BooksGallery from './Pages/BooksGallery/BooksGallery'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import editBook from './Pages/EditBook/EditBook';


class App extends Component {

  
  render() {
    return (
  
      <Router>
        <div className="App">
          <Layout>
              <Route exact path="/" component={BooksGallery} />
              <Route  path="/book/edit/:id?" component={BooksGallery} />
              <Route path="/book/edit/:id?" component={editBook} />
          </Layout>
        </div>
        
      </Router>
      
    );
  }
}

export default App;
