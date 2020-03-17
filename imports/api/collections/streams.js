import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { StreamSchema } from '../schemas/StreamSchema'

export function publishStreams() {
  Meteor.publish('streams.list', function() {
    return StreamCollection.find({}, { limit: 10 })
  })
}

Meteor.methods({
  'streams.insert': function(data) {
    StreamSchema.validate(data)
    if (StreamSchema.isValid()) {
      return StreamCollection.insert(StreamSchema.clean(data))
    } else {
      return StreamSchema.validationErrors()
    }
  },
  'streams.remove': function(id) {
    return StreamCollection.remove(id)
  },
})

export const StreamCollection = new Mongo.Collection('streams')
