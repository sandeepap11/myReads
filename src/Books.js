import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ShowBook from './ShowBook'

class Books extends Component{

	render(){
		const categories = [{name:"currentlyReading", value:"Currently Reading"},
						{name:"wantToRead", value:"Want to Read"},
						{name:"read", value:"Read"}]

		const {allBooks, onSelect} = this.props

		if(allBooks.length === 0){

		 return false

		}
		else{

			for(let book of allBooks){

					if(!book.imageLinks){
						book.imageLinks = [{smallThumbnail: ''}]
					}
			}
		}

		return(

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

												{
													allBooks.filter((book) =>(book.shelf === category.name)).map((book) =>(

														<ShowBook key={book.id} book={book} onSelect={onSelect} thumbNail={book.imageLinks.smallThumbnail}/>

														)
													)
												}

												</ol>
											</div>
										</div>
									</div>

									)
								)
							}

		 				</div>
					</div>
					<div className="open-search">
					<Link to='/search'>Add a book</Link>
					</div>
				</div>
			)
		}
	}

export default Books
