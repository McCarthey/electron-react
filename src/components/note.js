import React, { Component } from 'react';
import './note.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class Note extends Component {
  state = {
	checked: [0],
  };
  
  handleToggle = value => () => {
	const { checked } = this.state;
	const currentIndex = checked.indexOf(value);
	const newChecked = [...checked];
	
	if(currentIndex === -1) {
		newChecked.push(value);
	} else {
		newChecked.splice(currentIndex, 1);
	}
	
	this.setState({
		checked: newChecked,
	})
  };
  
  render() {
    return (
	  <div className="Note">
		<div className="note-add-input">
			<TextField
			label="note"
			defaultValue="write something"
			margin="normal"
			/>
			<Button variant="contained" color="primary" className='note-add-btn'>
				Primary
			</Button>
		</div>
		<div className="note-list">
			<List>
			{[0, 1, 2, 3].map(value => (
				<ListItem
				key={value}
				dense
				button
				onClick={this.handleToggle(value)}
				>
				<Checkbox
					checked={this.state.checked.indexOf(value) !== -1}
					tabIndex={-1}
					disableRipple
				/>
				<ListItemText primary={`Line item ${value + 1}`} />
				</ListItem>
			))}
			</List>
		</div>
      </div>
    );
  }
} 

export default Note;
