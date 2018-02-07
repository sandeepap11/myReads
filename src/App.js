import React from 'react'
import {Route} from 'react-router-dom'
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
            
            this.setState((state)=>(state.allBooks[state.allBooks.indexOf(book)].shelf=value ))		
			
	BooksAPI.update(book, value)	
}

  render() {	  
	  
    return (
      <div className="app">

          
     
         
             
           
	<Route exact path='/' render={
			
			() => (	<Books allBooks={this.state.allBooks} selectBook={this.onSelect}/> 	)
			
			}/>
     
		<Route path='/search' render={
			
			({history}) => (<Search allBooks={this.state.allBooks} onSearch={()=>(history.push('/'))}/>)}/>
		
      </div>
    )
  }
}

export default BooksApp
