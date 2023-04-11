import React, { Component } from 'react'
import { movies } from './Getmovies'
export default class Favourities extends Component 
{
  constructor()
  {
    super();
    this.state={
      currgen:"All Generes",
      movie:[],
      generes:[],
      currtext:"",
      limit:5,
      currPage:1
    
    }
  }
  sortPopular=()=>
  {
    let temp=this.state.movie;
    temp.sort(function(objA,objB){
      return objB.popularity-objA.popularity
    })
    this.setState({
      movies:[...temp]
    })

  }
  sortrating=()=>
  {
    let temp=this.state.movie;
    temp.sort(function(objA,objB){
      return objA.vote_average-objB.vote_average
    })
    this.setState({
      movies:[...temp]
    })

  }
  
  componentDidMount()
  {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let data=JSON.parse(localStorage.getItem("movies-app")||"[]")
    let temp=[];
    temp.push("All Generes")
  data.map((movieObj)=>{
        if(!temp.includes(genreids[movieObj.genre_ids[0]]))
        {
          temp.push(genreids[movieObj.genre_ids[0]])
        }
    })
    this.setState({
      generes:[...temp],
      movie:[...data]
    })
  }
  Rightgame(tempObj)
  {
       this.setState({
        currgen:tempObj
       })
       
  }
  handlepagenation=(page)=>{
    this.setState({
      currPage:page
    })
  }
  handleDelete=(id)=>{
  let newarr=[]
  newarr=this.state.movie.filter((movies)=>
  movies.id!=id
  )
  this.setState({
    movie:[...newarr]
  })
  localStorage.setItem("movies-app",JSON.stringify(newarr))

  }
  
  render() 
  {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let filterarr=[];
     if(this.state.currtext=="")
      {
        filterarr=this.state.movie
      }
      
     else
     { 
      filterarr=this.state.movie.filter((movieObj)=>{
       let title=movieObj.original_title.toLowerCase()
       return title.includes(this.state.currtext.toLowerCase())
      })
      
     }
     if(this.state.currgen!="All Generes")
     {
      filterarr=this.state.movie.filter((movieObj)=>
      this.state.currgen==genreids[movieObj.genre_ids[0]]
      )
    }
    let pages = Math.ceil(filterarr.length/this.state.limit);
    let pagesarr = [];
    for(let i=1;i<=pages;i++){
        pagesarr.push(i);
    }
    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filterarr = filterarr.slice(si,ei);
    return (
      <div>
        <>
        <div className="main">
            <div className="row">
                <div className="col-lg-3 col-sm-12">
                  <ul class="list-group favourities-generes">
                          {
                            this.state.generes.map((tempObj)=>(
                              this.state.currgen==tempObj?
                              <li class="list-group-item" style={{background:'#3f51b5',color:"white",fontWeight:"bold"}}>{tempObj}</li>:
                              <li class="list-group-item" style={{background:'white',color:"#3f51b5",fontWeight:"bold"}} onClick={()=>this.Rightgame(tempObj)}>{tempObj}</li>

                            ))
                          
                          }
                  
                    
                    </ul>
                </div> 
            
            <div className="col-lg-9 col-sm-12">
               <div className="row favourities-table">
                  <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currtext} onChange={(e)=>this.setState({currtext:e.target.value})}/>
                  <input type="number" className="input-group-text col" placeholder="Rows count"value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                    <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">title</th>
                                <th scope="col">Genere</th>
                                <th scope="col"><i class="fa-solid fa-chevron-up" onClick={this.sortPopular}/>Popularity</th>
                                <th scope="col"><i class="fa-solid fa-chevron-up"onClick={this.sortrating}></i>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                               {
                               filterarr.map((moviesObj)=>(
                                    <tr>
                                    <td>{<img src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`} alt={moviesObj.title} style={{width:'5rem'}}/>}{" "}{ moviesObj.title}</td>
                                    <td>{genreids[moviesObj.genre_ids[0]]}</td>
                                    <td>{moviesObj.popularity}</td>
                                    <td>{moviesObj.vote_average}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(moviesObj.id)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                           {
                            pagesarr.map((pageitm)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>this.handlepagenation(pageitm)}>{pageitm}</a></li>
                            ))
                           }
                            
                            
                            
                        </ul>
                    </nav>
               </div> 
            </div> 
    </div>
</div>
            
     
      </>
      </div>
    )
  }
}
