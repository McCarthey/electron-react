import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class DeleteDialog extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
					onClose={this.props.btnCancelClick}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
							{this.props.content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
						<Button onClick={this.props.btnCancelClick} color="primary">
							{this.props.btnCancel}
                        </Button>
						<Button onClick={this.props.btnOKClick} color="primary" autoFocus>
							{this.props.btnOK}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default DeleteDialog