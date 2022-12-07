import { normalize,denormalize } from 'normalizr'
import {v4 as uuidv4} from 'uuid'

export const denormalizeData = async (data,dataSchema) => {
    const denormalizedData = denormalize(data.result, dataSchema, data.entities)
    return denormalizedData
}

export const normalizeData = async (daoModel, dataSchema) => {
  try {
    const originalData = await daoModel.get()
    let normalizedData = normalize(originalData.map(row => ({...row, id: uuidv4()})), dataSchema)

    return normalizedData

  } catch (err) {
    console.log('Something went wrong normalizing data')
    console.log(err)
  }
}