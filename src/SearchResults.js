import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'


class SearchResults extends Component{
	
	state = {
		
		searchResults : []
	}
	


updateOnProps = (properties) => {
	const {fromSearchResults, allBooks} = properties

	          
            this.setState({searchResults:fromSearchResults})			
			 


		for(let searchResult of fromSearchResults){
			
			this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf='none'))
			
				for(let book of allBooks){
					
					if(book.id === searchResult.id){
						this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf=book.shelf))
						
						break
					}					
				}
}
			}

componentDidMount(){
	this.updateOnProps(this.props)
			}

componentWillReceiveProps(nextProps){
	this.updateOnProps(nextProps)
			}


	selectBook = (value, book) =>{	
            
		 
		this.setState((state)=>(state.searchResults[state.searchResults.indexOf(book)].shelf=value ))	
		
						
			
	BooksAPI.update(book, value)	
}

render(){
	
	const {searchResults} = this.state
	let thumbNails = []
	
for(let searchResult of searchResults){
	
	if(!searchResult.imageLinks){
		
		thumbNails[searchResults.indexOf(searchResult)] = ''
	}
	else{
		thumbNails[searchResults.indexOf(searchResult)] = searchResult.imageLinks.smallThumbnail
	}
}
	
			 	

return(<div className="bookshelf-books">
                    <ol className="books-grid">		
		
				 	{searchResults.map((searchResult) => (
				 
				 <li key={searchResult.id}>
			
				<div className="book">
							  <div className="book-top">
								<div className="book-cover" style={{ width: 150, height: 210, backgroundSize:'cover', backgroundImage: `url(${thumbNails[searchResults.indexOf(searchResult)]})`}}></div>
								<div className="book-shelf-changer">
								  <select onChange={(event) => ( this.selectBook(event.target.value, searchResult))} value={searchResult.shelf}>
									<option value="moveto" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								  </select>
								</div>
							  </div>
							  <div className='book-title'>{searchResult.title}</div>								
 							<div>							
								{(searchResult.authors) && (searchResult.authors.map((author) =>(<div className='book-authors' key={author}>{author}</div>)))}							
							</div>
							
							</div>
				
				
				</li>
))}

		</ol>
        </div>
				)}
}


export default SearchResults