import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import User from '../models/user'

dayjs.locale('pt-br')

const find = async (queryParams) => {
  const { code = null, access_token = null, active = null } = queryParams

  const query = {}

  if (code) query.code = code

  if (access_token) query.access_token = access_token

  // Active channels = updated_at >= 60 days old
  if (active) query.updated_at = { $gte: dayjs().subtract(60, 'day') }

  try {
    const users = await User.find(query).sort('-updated_at')
    return users
  } catch (e) {
    return false
  }
}

const create = async (body) => {
  body.created_at = dayjs()
  body.updated_at = dayjs()

  try {
    const user = await User.create(body)
    return user
  } catch (e) {
    return false
  }
}

const updateOne = async (_id, body) => {
  body.updated_at = dayjs()

  try {
    await User.findOneAndUpdate({ _id: _id }, body)
    const user = await findOne(_id)
    return user
  } catch (e) {
    return false
  }
}

const findOne = async (_id) => {
  try {
    const user = await User.findById(_id)
    return user
  } catch (e) {
    return false
  }
}

const deleteOne = async (_id) => {
  try {
    const user = await User.findByIdAndDelete(_id)
    return user
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
