import React from 'react';

export default class Movie extends React.Component{
  state={movie:null,error:''};

  componentDidMount(){
    const id=this.props.match.params.id;
    fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=b7da8d63`)
      .then(r=>r.json())
      .then(data=>{
        if(data.Response==='False') throw new Error(data.Error);
        this.setState({movie:data});
      })
      .catch(err=>this.setState({error:err.message}));
  }

  render(){
    if(this.state.error) return <div>{this.state.error}</div>;
    if(!this.state.movie) return null;

    const m=this.state.movie;
    return(
      <div>
        <h1>{m.Title}</h1>
        <p>{m.Year}</p>
        <p>{m.Plot}</p>
        <p>Director: {m.Director}</p>
        <p>IMDB: {m.imdbRating}</p>
        <img src={m.Poster} alt={m.Title}/>
      </div>
    );
  }
}
