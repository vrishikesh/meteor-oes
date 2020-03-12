import { Meteor } from 'meteor/meteor'
import { publishStreams } from '../imports/api/collections/streams'

Meteor.startup(() => {
  publishStreams()
})
