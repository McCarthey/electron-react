import React, {Component} from 'react'
import './note.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import DeleteDialog from './dialog'

class Note extends Component {
    state = {
        checked: [0],
        itemToAdd: '',
        toDoList: [],
        deleteOpen: false,
        chosenId: ''
    }

    componentDidMount() {
        const jsonData = localStorage.getItem('RE_toDoList')
        if (!jsonData) return
        this.setState({
            toDoList: JSON.parse(jsonData)
        })
    }

    primaryKey = () => {
        const listCopy = this.state.toDoList.slice()
        if (listCopy.length === 0) {
            return 0
        }
        let result = []
        for (let i = 0; i < listCopy.length; i++) {
            result.push(listCopy[i].id)
        }
        console.log(result, Math.max(...result) + 1)
        return Math.max(...result) + 1
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
    }

    handleAddItem = async () => {
        console.log(this.state.itemToAdd)
        if (!this.state.itemToAdd) return false
        const todoObj = {
            id: this.primaryKey(),
            todo: this.state.itemToAdd,
            done: false
        }
        await this.setState(prevState => ({
            toDoList: prevState.toDoList.concat([todoObj]),
            itemToAdd: ''
        }))
        console.log(this.state.toDoList)
        this.saveInfo()
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleDelete = id => () => {
        this.setState({deleteOpen: true, chosenId: id})
    }

    handleBtnDeleteCancel = () => {
        this.setState({deleteOpen: false, chosenId: ''})
    }

    handleBtnDeleteOK = async () => {
        const id = this.state.chosenId
        this.setState({deleteOpen: false})
        let listCopy = this.state.toDoList.slice()
        const index = this.findDeleteItem(id, listCopy)
        listCopy.splice(index, 1)
        await this.setState({toDoList: listCopy, chosenId: ''})
        this.saveInfo()
    }

    findDeleteItem = (id, list) => {
        // eslint-disable-next-line
        console.log(id, list)
        let result
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                result = i
                break
            }
        }
        return result
    }

    handleClearAll = () => {
        this.setState({
            toDoList: []
        })
        this.clearInfo()
    }

    saveInfo = () => {
        localStorage.setItem('RE_toDoList', JSON.stringify(this.state.toDoList))
    }

    clearInfo = () => {
        localStorage.setItem('RE_toDoList', '')
    }

    render() {
        return (
            <div className="Note">
                <div className="note-add-input">
                    <TextField label="note" onChange={this.handleChange('itemToAdd')} value={this.state.itemToAdd} margin="normal" />
                    <Button onClick={this.handleAddItem} variant="contained" color="primary" className="note-add-btn">
                        Add
                    </Button>
                </div>
                <div className={this.state.toDoList.length !== 0 ? 'note-list' : 'note-empty'}>
                    <List>
                        {this.state.toDoList.map(obj => (
                            <ListItem key={obj.id} dense button>
                                <Checkbox checked={obj.done} tabIndex={-1} disableRipple onClick={this.handleToggle(obj.id)} />
                                <ListItemText primary={obj.todo} />
                                <IconButton aria-label="Delete" onClick={this.handleDelete(obj.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <Button onClick={this.handleClearAll} variant="contained" color="secondary" className="note-add-btn">
                    Clear
                </Button>
                <DeleteDialog
                    title="Info"
                    content="Are you sure you want to delete this?"
                    btnCancel="cancel"
                    btnOK="Sure"
                    open={this.state.deleteOpen}
                    btnCancelClick={this.handleBtnDeleteCancel}
                    btnOKClick={this.handleBtnDeleteOK}
                />
            </div>
        )
    }
}

export default Note
