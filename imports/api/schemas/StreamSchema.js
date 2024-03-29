// import SimpleSchemaBridge from 'uniforms-bridge-simple-schema'
import SimpleSchema from 'simpl-schema'

const StreamSchema = new SimpleSchema({
  streamName: {
    type: String,
    max: 32,
    min: 2,
    required: true,
  },
}).newContext()

// const StreamSchemaBridge = SimpleSchemaBridge(StreamSchema)

export { StreamSchema }
