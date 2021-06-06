import 'dayjs/locale/pt-br'
import Configuration from '../models/configuration'
import dayjs from 'dayjs'

dayjs.locale('pt-br')

const find = async (queryParams) => {
  const { code = null } = queryParams

  const query = {}

  if (code) query.code = code

  try {
    const configurations = await Configuration.find(query).sort('index')
    return configurations
  } catch (e) {
    return false
  }
}

const create = async (body) => {
  body.created_at = dayjs()
  body.updated_at = dayjs()

  try {
    const configuration = await Configuration.create(body)
    return configuration
  } catch (e) {
    return false
  }
}

const updateOne = async (_id, body) => {
  body.updated_at = dayjs()

  try {
    await Configuration.findOneAndUpdate({ _id: _id }, body)
    const configuration = await findOne(_id)
    return configuration
  } catch (e) {
    return false
  }
}

const findOne = async (_id) => {
  try {
    const configuration = await Configuration.findById(_id)
    return configuration
  } catch (e) {
    return false
  }
}

const deleteOne = async (_id) => {
  try {
    const configuration = await Configuration.findByIdAndDelete(_id)
    return configuration
  } catch (e) {
    return false
  }
}

export {
  find,
  create,
  updateOne,
  findOne,
  deleteOne
}
