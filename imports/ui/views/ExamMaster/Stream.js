import React, { useState } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogTitle from '@material-ui/core/DialogTitle'

import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Table from '../../components/Table/Table.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import Button from '../../components/CustomButtons/Button'
import CustomInput from '../../components/CustomInput/CustomInput'
import useStyles from './css/Stream'
import { StreamCollection } from '../../../api/collections/streams'

const Stream = props => {
  const [open, setOpen] = useState(false)
  const [streamId, setStreamId] = useState(null)
  const [streamName, setStreamName] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  let streams = []

  if (props.streams.length) {
    streams = props.streams.map(({ _id, streamName }) => {
      return [
        streamName,
        <div>
          <Button onClick={e => handleEdit(_id, streamName)}>Edit</Button>
          <Button onClick={e => handleRemove(_id)} color="danger">
            Delete
          </Button>
        </div>,
      ]
    })
  }

  const handleSave = () => {
    setLoading(true)
    Meteor.call('streams.insert', { streamName }, (error, res) => {
      if (error) {
        console.error('error: ', error)
      } else if (Array.isArray(res)) {
        console.log('response: ', res)
        alert('Stream Name should be min 3 and max 32 characters')
      } else {
        console.log('response: ', res)
        handleDialogClose()
      }

      setLoading(false)
    })
  }

  const handleRemove = id => {
    Meteor.call('streams.remove', id, (error, res) => {
      if (error) {
        console.error('error: ', error)
      } else {
        console.log('response: ', res)
      }
    })
  }

  const handleEdit = (id, streamName) => {
    setStreamId(id)
    setStreamName(streamName)
    setOpen(true)
  }

  const handleDialogClose = () => {
    setStreamName('')
    setStreamId(null)
    setOpen(false)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <h4 className={classes.cardTitleWhite}>Stream</h4>
                <p className={classes.cardCategoryWhite}>Stream List</p>
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <Button
                  color="white"
                  className={'pull-right'}
                  onClick={() => setOpen(true)}
                >
                  Add Stream
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['Stream Name', 'Actions']}
              tableData={streams}
            />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">Add Stream</DialogTitle>
        <DialogContent>
          {/*dialogContentText ? (
            <DialogContentText>{dialogContentText}</DialogContentText>
          ) : null*/}
          <CustomInput
            labelText="Enter Stream Name"
            id="stream-name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onInput: e => setStreamName(e.target.value),
              value: streamName,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="danger">
            Cancel
          </Button>

          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color={loading ? 'white' : 'success'}
              disabled={loading}
              onClick={handleSave}
            >
              Save
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}

export default withTracker(() => {
  Meteor.subscribe('streams.list')

  return { streams: StreamCollection.find().fetch() }
})(Stream)
