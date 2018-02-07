import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Books extends Component{

render(){
	const categories = [{name:"currentlyReading", value:"Currently Reading"}, 
					{name:"wantToRead", value:"Want to Read"}, 
					{name:"read", value:"Read"}]
	
	const {allBooks, selectBook} = this.props
	
	if(allBooks.length === 0){
     return false 
    }
	else{
		
		for(let book of allBooks){
		
				
				if(!book.imageLinks){					
					book.imageLinks = [{smallThumbnail: ''}]					
				 			}}
	}
	
	return(	
		
	<div >
		 <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
		{categories.map((category) =>(
		
		<div key={category.name}>
			<div className="bookshelf">
                  <h2 className="bookshelf-title">{category.value}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">		
		
		{allBooks.filter((books) =>(books.shelf === category.name)).map((books) =>(
	
						<li key={books.id}>
							<div className="book">
							  <div className="book-top">
								<div className="book-cover" style={{ width: 150, height: 210, backgroundSize:'cover', backgroundImage: `url(${books.imageLinks.smallThumbnail})` }}></div>
								<div className="book-shelf-changer">
								  <select onChange={(event) => selectBook(event.target.value, books)} value={category.name}>
									<option value="moveto" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								  </select>
								</div>
							  </div>
							  <div className="book-title">{books.title}</div>
							
							 <div>							
								{(books.authors) && (books.authors.map((author) =>(<div className='book-authors' key={author}>{author}</div>)))}							
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
		</div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>


</div>
	)
}

}

export default Books