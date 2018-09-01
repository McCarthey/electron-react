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
	
	componentDidMount() {
		const jsonData = localStorage.getItem('RE_toDoList')
		if (!jsonData) return
		this.setState({
			toDoList: JSON.parse(jsonData)
		})
	}
	
	handleToggle = id => () => {
		const listCopy = this.state.toDoList.slice()
		// eslint-disable-next-line
		listCopy.map(obj => {
			if (obj.id === id) {
				obj.done = !obj.done
				// eslint-disable-next-line
				return
			}
		})
		this.saveInfo()
		this.setState({
			toDoList: listCopy
		})
	};
	
	handleAddItem = async () => {
		console.log(this.state.itemToAdd)
		if (!this.state.itemToAdd) return false;
		const todoObj = {
			id: this.state.toDoList.length,
			todo: this.state.itemToAdd,
			done: false
		}
		await this.setState(prevState => ({
			toDoList: prevState.toDoList.concat([todoObj]),
			itemToAdd: ''
		}))
		console.log(this.state.toDoList)
		this.saveInfo()
	};
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
	};
	
	handleClearAll = () => {
		this.setState({
			toDoList: []
		})
		this.clearInfo()
	};
	
	saveInfo = () => {
		localStorage.setItem('RE_toDoList', JSON.stringify(this.state.toDoList))
	};
	
	clearInfo = () => {
		localStorage.setItem('RE_toDoList', '')
	}
	
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
		<div className={this.state.toDoList.length!==0?"note-list":"note-empty"}>
			<List>
			{this.state.toDoList.map(obj => (
				<ListItem
				key={obj.todo}
				dense
				button
				onClick={this.handleToggle(obj.id)}
				>
				<Checkbox
					checked={obj.done}
					tabIndex={-1}
					disableRipple
				/>
				<ListItemText primary={obj.todo} />
				</ListItem>
			))}
			</List>
			</div>
			<Button onClick={this.handleClearAll} variant="contained" color="secondary" className='note-add-btn'>
				Clear
			</Button>	
      </div>
    );
  }
} 

export default Note;
