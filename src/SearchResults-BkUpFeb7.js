import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'


class SearchResults extends Component{
	
	
	
updateShelf = (searchResults, allBooks) =>{

			
			for(let searchResult of searchResults){
			searchResult.shelf='none'
				
				if(!searchResult.imageLinks){					
					searchResult.imageLinks = [{smallThumbnail: ''}]					
				 			}
				for(let book of allBooks){
					
					if(book.id === searchResult.id){
						searchResult.shelf = book.shelf
						break
					}					
				}
			
			}
	
	return searchResults
		}
	
	
	selectBook = (value, book) =>{	
            
		 book.shelf=value	
						
			
	BooksAPI.update(book, value)	
}

render(){
	
	
	const {fromSearchResults, allBooks} = this.props
	let searchResults = []
		
	
	if(fromSearchResults.length === 0){
		
		return false
	}
	
		
	else {	
						
					 searchResults = this.updateShelf(fromSearchResults, allBooks)	
			
				
			 	

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