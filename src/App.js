import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
  // Switch 
} from 'react-router-dom'
import './App.css';
import Note from './components/note.js'
import NameDialog from './components/nameDialog.js'
import WbSunny from '@material-ui/icons/WbSunny'

// for test and practice
import HelloMessage from './test/hello'
import Timer from './test/timer'
import MDConverter from './test/md-convert'
import TodoApp from './test/todo'

class App extends Component {
  state = {
    username: ''
  }
  
  componentDidMount() {
    const username = localStorage.getItem('RE_toDoList_name')
    if (username) {
      this.setState({ username })
    }
  }
  
  render() {
    let dialog
    if (!this.state.username) {
      dialog = <NameDialog />
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <WbSunny className="App-logo" style={{ fontSize: 64, color: '#f00' }} />
          <HelloMessage name={this.state.username} />
          <h1 className="App-title">Have a nice day!</h1>
          <Timer />
        </header>
        {dialog}
        <Router>
          <div>
            <span><Link to="/Note">Note</Link></span>
            <br />
            <span><Link to="/md-converter">MD</Link></span>
            <Route exact path="/" component={Note}/>
            <Route path="/Note" component={Note}/>
            <Route path='/md-converter' component={MDConverter}/>
            <Route path='/test' component={TodoApp}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
