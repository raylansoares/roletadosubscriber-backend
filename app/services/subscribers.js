import moment from 'moment'
import Subscriber from '../models/subscriber'

const find = async () => {
    const subscribers = await Subscriber.find({}).sort('-created_at');
    return subscribers
}

const create = async (body) => {
    body.created_at =  moment()
    body.updated_at =  moment()
    const subscriber = await Subscriber.create(body);
    return subscriber
}

const update = async (_id, body) => {
    body.updated_at =  moment()
    const subscriber = await Subscriber.findOneAndUpdate({ _id: _id}, body);
    return subscriber
}

const findOne = async (_id) => {
    const subscriber = await Subscriber.findById(_id);
    return subscriber
}

const deleteOne = async (_id) => {
    const subscriber = await Subscriber.findByIdAndDelete(_id);
    return subscriber
}

export {
    find,
    create,
    update,
    findOne,
    deleteOne
}