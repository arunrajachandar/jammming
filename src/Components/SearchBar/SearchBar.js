import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            term:''
        }
        this.handleChangeTerm = this.handleChangeTerm.bind(this)
        this.search = this.search.bind(this)
    }
    search(){
        this.props.onChange(this.state.term)
    }
    handleChangeTerm(event){
        event.preventDefault();
        let term = event.target.value;
        this.setState({term: term})
         this.props.onChange(term);
    }
    render(){
        return(<div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleChangeTerm}/>
  <button className="SearchButton" onClick ={this.search}>SEARCH</button>
</div>)
    }
}

export default SearchBar;