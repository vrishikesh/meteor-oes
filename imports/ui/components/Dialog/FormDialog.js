import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '../CustomButtons/Button'

export default function FormDialog(props) {
  const { btnText, dialogTitle, dialogContentText, btnClass, fields } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color="white" className={btnClass} onClick={handleClickOpen}>
        {btnText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={'true'}
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContentText ? (
            <DialogContentText>{dialogContentText}</DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={handleClose} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
