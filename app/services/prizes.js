import moment from 'moment'
import Prize from '../models/prize'

const find = async () => {
    const prizes = await Prize.find({}).sort('-created_at');
    return prizes
}

const create = async (body) => {
    body.created_at =  moment()
    body.updated_at =  moment()
    const prize = await Prize.create(body);
    return prize
}

const update = async (_id, body) => {
    body.updated_at =  moment()
    await Prize.findOneAndUpdate({ _id: _id}, body);
    const prize = await findOne(_id) 
    return prize
}

const findOne = async (_id) => {
    const prize = await Prize.findById(_id);
    return prize
}

export {
    find,
    create,
    update,
    findOne
}