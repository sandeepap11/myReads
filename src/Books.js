import React, {Component} from 'react'
import * as BooksAPI  from './BooksAPI'

class Books extends Component{
	
	state = {
		
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

render(){
	const categories = [{name:"currentlyReading", value:"Currently Reading"}, 
					{name:"wantToRead", value:"Want to Read"}, 
					{name:"read", value:"Read"}]
	
	const {allBooks} = this.state
	
	if(this.state.allBooks.length === 0){
     return false 
    }
	
	return(	
		
	<div >
		{categories.map((category) =>(
		
		<div key={category.name}>
			<div className="bookshelf">
                  <h2 className="bookshelf-title">{category.value}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
		
		
		
		{allBooks.filter((books) =>(books.shelf === category.name)).map((books) =>(
	
	<li key={books.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => this.onSelect(event.target.value, books)} value={category.name}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div>
							
							{books.authors.map((author) =>(<div className='book-authors' key={author}>{author}</div>))}
							
						</div>
                        </div>
        </li> 
	
		)
	)}
		
		

		</ol>
        </div>
      </div>
</div>
		
		))	}
		
		
	


</div>
	)
}

}

export default Books