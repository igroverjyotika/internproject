 import React, { Component } from 'react'
 import {Link} from 'react-router-dom'
 export default class Navbar extends Component {
   render() {
     return (
       <div style={{display:'flex',padding:'0.5'}}>
        <Link to="/"style={{textDecoration:"None"}}><h1 >Movies app</h1></Link>
        <Link to="/favourites"style={{textDecoration:"None"}}> <h2 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h2></Link>
       </div>
     )
   }
 }
 