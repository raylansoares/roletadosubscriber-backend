import moment from 'moment'
import Subscriber from '../models/subscriber'

const find = async () => {
    const subscriber = await Subscriber.find({}).sort('-created_at');

    return subscriber
}

const create = async (body) => {

    body.created_at =  moment()
    body.updated_at =  moment()

    const subscriber = await Subscriber.create(body);

    return subscriber
}

export {
    find,
    create
}