import React, {Component} from 'react';
import './App.css';
import Pages from './Components/Pages/pages';
import Addpageform from './Container/addpageform';


class App extends Component{



  render(){
    return(
      <div>
        <h1>insta</h1>
        <Pages/>
        <Addpageform/>
      </div>
    )
  }
}

export default App;
