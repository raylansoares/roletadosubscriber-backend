import Subscriber from '../models/subscriber'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const find = async () => {
    const subscribers = await Subscriber.find({}).sort('-created_at');
    return subscribers
}

const create = async (body) => {
    body.created_at =  dayjs()
    body.updated_at =  dayjs()
    const subscriber = await Subscriber.create(body);
    return subscriber
}

const updateOne = async (_id, body) => {
    body.updated_at =  dayjs()
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
    updateOne,
    findOne,
    deleteOne
}