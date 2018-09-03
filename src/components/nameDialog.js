import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class NameDialog extends Component {
    state = {
        open: true,
        name: ''
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleChange = e => {
        this.setState({name: e.target.value})
    }

    handleSave = () => {
        localStorage.setItem('RE_toDoList_name', this.state.name)
        this.handleClose()
        window.location.href = window.location.href
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Welcome</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter your name please"
                            onChange={this.handleChange}
                            value={this.state.name}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
