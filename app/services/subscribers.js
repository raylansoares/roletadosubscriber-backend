import Subscriber from '../models/subscriber'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const find = async (queryParams) => {
    const { code = null } = queryParams

    const query = {}
    
    if (code) query.code = code

    try {
        const subscribers = await Subscriber.find(query).sort('-created_at');
        return subscribers
    } catch (e) {
        return false
    }
}

const create = async (body) => {
    body.created_at =  dayjs()
    body.updated_at =  dayjs()

    try {
        const subscriber = await Subscriber.create(body);
        return subscriber
    } catch (e) {
        return false
    }
}

const updateOne = async (_id, body) => {
    body.updated_at =  dayjs()

    try {
        const subscriber = await Subscriber.findOneAndUpdate({ _id: _id}, body);
        return subscriber
    } catch (e) {
        return false
    }
}

const findOne = async (_id) => {
    try {
        const subscriber = await Subscriber.findById(_id);
        return subscriber
    } catch (e) {
        return false
    }
}

const deleteOne = async (_id) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(_id);
        return subscriber
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