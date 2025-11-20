import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component{
  state={searchTerm:'',results:[],error:''};

  handleChange=e=>this.setState({searchTerm:e.target.value});

  handleSubmit=e=>{
    e.preventDefault();
    const t=this.state.searchTerm.trim();
    if(!t) return;
    fetch(`https://www.omdbapi.com/?s=${t}&apikey=b7da8d63`)
      .then(r=>r.json())
      .then(data=>{
        if(data.Response==='False') throw new Error(data.Error);
        this.setState({results:data.Search,error:''});
      })
      .catch(err=>this.setState({error:err.message}));
  };

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search movies..."/>
          <button>Search</button>
        </form>

        {this.state.error || this.state.results.map(m=>(
          <div key={m.imdbID}>
            <Link to={`/movie/${m.imdbID}/`}>{m.Title}</Link>
          </div>
        ))}
      </div>
    );
  }
}
