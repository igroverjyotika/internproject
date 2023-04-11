import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourities from './components/Favourities';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';

function App() 
{
  return (
    <Router>
      <Navbar/>
     
     <Switch>
      <Route path='/' exact render={(props)=>(
         
         <>
         <Banner {...props}/>
         <Movies {...props}/>
         </>
       )}/>
      <Route path='/favourites'exact component={Favourities}/>
      </Switch>
       
      
    </Router>
  );
}

export default App;

