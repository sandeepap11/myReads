import React, {Component} from 'react'
import * as BooksAPI  from './BooksAPI'

class Search extends Component{
	
	state={query: '',
		   searchResults: []
		  }
	
	updateQuery = (query) => {

            this.setState({query: query.trim()})
		
		if(query.length > 0){
					 BooksAPI.search(query).then(    
        (searchResults) => {
			this.setState({searchResults})
			}   	
					 )  			
				}
		
		else{
			 (searchResults) => {
			this.setState({searchResults:[]})
			} 
			
		}

		
		(this.state.searchResults.length > 0) && (
				
				
						this.updateShelf(this.state.searchResults, this.props.allBooks)	)
        }

	
	onSelect = (value, book) =>{
		
            
            this.setState((state)=>(state.allBooks[state.allBooks.indexOf(book)].shelf=value								
									
			))		
			
	BooksAPI.update(book, value)	
}

		updateShelf = (searchResults, allBooks) =>{
			
			for(let searchResult of searchResults){
			this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf='none'	))
				
				
				 			
				for(let book of allBooks){
					
					if(book.id === searchResult.id){
						console.log(book.id + "... " + searchResult.id + "..." + book.shelf)
						this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf = book.shelf))
						break
					}
					
				}
			
			}
		}
	

	
	render(){
		
		const {query, searchResults} = this.state
		const {allBooks, selectBook} = this.props
		
		
		

		return (
			
			
			
		
			<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
               
                <input type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
			
				{ (searchResults.length > 0) && (
				    
				
				   <div className="bookshelf-books">
                    <ol className="books-grid">		
		
				 	{searchResults.map((searchResult) => (
				 
				 <li key={searchResult.id}>
				
				<div className="book">
							  <div className="book-top">
								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${searchResult.imageLinks.smallThumbnail})` }}></div>
								<div className="book-shelf-changer">
								  <select onChange={(event) => selectBook(event.target.value, searchResult)} value={searchResult.shelf}>
									<option value="moveto" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								  </select>
								</div>
							  </div>
							  <div className='book-title'>{searchResult.title}</div>
								<div className='book-authors'>{searchResult.authors}</div>
							
							</div>
				
				
				</li>
))}

		</ol>
        </div>
				)}
				
              <ol className="books-grid"></ol>
            </div>
          </div>
		)
		
	}
}

export default Search

/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
<Books allBooks={searchResults} selectBook={this.onSelect}/>
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */