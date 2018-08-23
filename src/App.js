import React, { Component } from 'react';
import './App.css';
import Note from './components/note.js'
import WbSunny from '@material-ui/icons/WbSunny'

// for test and practice
import HelloMessage from './test/hello'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WbSunny className="App-logo" style={{ fontSize: 64, color: '#f00' }} />
          <HelloMessage name='McCarthey' />
          <h1 className="App-title">Have a nice day!</h1>
        </header>
        <Note />
      </div>
    );
  }
}

export default App;
