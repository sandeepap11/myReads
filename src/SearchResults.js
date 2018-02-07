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
			
				if(!searchResult.imageLinks){	
					this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].imageLinks=[{smallThumbnail: ''}]))
										
				 			}
				for(let book of allBooks){
					
					if(book.id === searchResult.id){
						this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf=book.shelf))
						
						break
					}					
				}
}
			}

componentWillReceiveProps(nextProps){
	this.updateOnProps(nextProps)
			}

componentDidMount(){
	this.updateOnProps(this.props)
			}

	
	
	selectBook = (value, book) =>{	
            
		 
		this.setState((state)=>(state.searchResults[state.searchResults.indexOf(book)].shelf=value ))	
		
						
			
	BooksAPI.update(book, value)	
}

render(){
	
	console.log('rendering in results')
	
	const {searchResults} = this.state
	
	if(this.props.fromSearchResults.length === 0){
		console.log('zero')
		
		return false
	}
	
		
	else {	
					console.log('not zero')	
	
			 	

return(<div className="bookshelf-books">
                    <ol className="books-grid">		
		
				 	{searchResults.map((searchResult) => (
				 
				 <li key={searchResult.id}>
			
				<div className="book">
							  <div className="book-top">
								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${searchResult.imageLinks.smallThumbnail})` }}></div>
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
				)}}
}


export default SearchResults