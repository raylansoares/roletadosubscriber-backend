import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import Prize from '../models/prize'

dayjs.locale('pt-br')

const find = async (queryParams) => {
  const { code = null } = queryParams

  const query = {}

  if (code) query.code = code

  try {
    const prizes = await Prize.find(query).sort('index')
    return prizes
  } catch (e) {
    return false
  }
}

const create = async (body) => {
  body.created_at = dayjs()
  body.updated_at = dayjs()

  try {
    const prize = await Prize.create(body)
    return prize
  } catch (e) {
    return false
  }
}

const updateOne = async (_id, body) => {
  body.updated_at = dayjs()

  try {
    await Prize.findOneAndUpdate({ _id: _id }, body)
    const prize = await findOne(_id)
    return prize
  } catch (e) {
    return false
  }
}

const findOne = async (_id) => {
  try {
    const prize = await Prize.findById(_id)
    return prize
  } catch (e) {
    return false
  }
}

const deleteOne = async (_id) => {
  try {
    const prize = await Prize.findByIdAndDelete(_id)
    return prize
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
