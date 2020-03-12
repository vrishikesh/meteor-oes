import React, { useState, useEffect, useRef } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import Backdrop from '@material-ui/core/Backdrop'
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
  const [streams, setStreams] = useState([])
  const [streamName, setStreamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [draw, setDraw] = useState(0)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      setBackdropOpen(true)
      const response = props.streams
      console.log(response)
      if (response.length) {
        let newStreams = Object.entries(response.data).map(([key, record]) => {
          if (record && record.streamName && record.streamName.length) {
            return [
              record.streamName,
              <Button data-stream-name={record.streamName}>Edit</Button>,
            ]
          } else return null
        })

        newStreams = newStreams.filter(_ => _ !== null)
        setStreams(newStreams)
      }
      setBackdropOpen(false)
    })()
  }, [draw])

  const handleSave = async () => {
    setLoading(true)
    try {
      Meteor.call('streams.insert', { streamName }, (err, res) => {
        if (err) {
          console.log('error: ', err)
        } else {
          console.log('response: ', res)
        }
      })
      setOpen(false)
      setDraw(draw + 1)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GridContainer>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
      >
        <CircularProgress color="primary" />
      </Backdrop>
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
        onClose={() => setOpen(false)}
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
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="danger">
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
