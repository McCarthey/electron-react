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
		itemToAdd: '',
		toDoList: [],
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
	
	handleAddItem = () => {
		console.log(this.state.itemToAdd)
		if (!this.state.itemToAdd) return false;
		this.setState(prevState => ({
			toDoList: prevState.toDoList.concat(this.state.itemToAdd),
			itemToAdd: ''
		}))
		console.log(this.state.toDoList)
	};
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render() {
    return (
	  <div className="Note">
		<div className="note-add-input">
			<TextField
			label="note"
			onChange={this.handleChange('itemToAdd')}
			value={this.state.itemToAdd}
			margin="normal"
			/>
			<Button onClick={this.handleAddItem} variant="contained" color="primary" className='note-add-btn'>
				Add
			</Button>
		</div>
		<div className="note-list">
			<List>
			{this.state.toDoList.map(value => (
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
				<ListItemText primary={`Line item ${value}`} />
				</ListItem>
			))}
			</List>
		</div>
      </div>
    );
  }
} 

export default Note;
