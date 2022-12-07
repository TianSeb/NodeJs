const normalizr = require('normalizr')

const schema = normalizr.schema

const author = new schema.Entity('author',{},{ idAttribute: 'id'})

const msg = new schema.Entity(
    'message',
    {
      author,
    },
    { idAttribute: 'id' }
  )
  
export const chatMsgSchema = new schema.Array(msg)