import moment from 'moment'
import Subscriber from '../models/subscriber'

const find = async () => {
    const subscriber = await Subscriber.find({}).sort('-created_at');

    return subscriber
}

const create = async (body) => {

    const now = moment().subtract(3, 'hour')

    body.created_at =  now
    body.updated_at =  now

    const subscriber = await Subscriber.create(body);

    return subscriber
}

export {
    find,
    create
}