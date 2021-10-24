import Subscription from '../models/subscription'

const create = async (body) => {
  try {
    const formattedBody = formatBody(body)
    const subscription = await Subscription.create(formattedBody)
    return subscription
  } catch (e) {
    return false
  }
}

const updateOne = async (id, body) => {
  try {
    const subscriber = await Subscription.findOneAndUpdate({ id: id }, body)
    return subscriber
  } catch (e) {
    return false
  }
}

const deleteOne = async (code, type) => {
  try {
    const subscription = await Subscription.findOneAndDelete({ code: code, type: type })
    return subscription
  } catch (e) {
    return false
  }
}

const formatBody = (body) => {
  const code = Buffer.from(body.condition.broadcaster_user_id, 'utf8')
  const userCode = code.toString('base64')
  body.code = userCode
  return body
}

export {
  create,
  updateOne,
  deleteOne
}
