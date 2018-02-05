import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import './App.css'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
	
		
		allBooks : []
	
 
	  
  }


componentDidMount(){
    
    BooksAPI.getAll().then(    
        (books) => {            
            this.setState({allBooks:books})			
			}        
    )
}



onSelect = (value, book) =>{	
            
            this.setState((state)=>(state.allBooks[state.allBooks.indexOf(book)].shelf=value								
									
			))		
			
	BooksAPI.update(book, value)	
}

  render() {	  
	  
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search allBooks={this.state.allBooks} selectBook={this.onSelect}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              { <Books allBooks={this.state.allBooks} selectBook={this.onSelect}/>}
            </div>
		</div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>

        )}
		
		
      </div>
    )
  }
}

export default BooksApp
