import Prize from '../models/prize'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const find = async (queryParams) => {
    const { code = null } = queryParams

    const query = {}
    
    if (code) query.code = code

    const prizes = await Prize.find(query).sort('-created_at');
    return prizes
}

const create = async (body) => {
    body.created_at =  dayjs()
    body.updated_at =  dayjs()
    const prize = await Prize.create(body);
    return prize
}

const updateOne = async (_id, body) => {
    body.updated_at =  dayjs()
    await Prize.findOneAndUpdate({ _id: _id}, body);
    const prize = await findOne(_id) 
    return prize
}

const findOne = async (_id) => {
    const prize = await Prize.findById(_id);
    return prize
}

const deleteOne = async (_id) => {
    const prize = await Prize.findByIdAndDelete(_id);
    return prize
}

export {
    find,
    create,
    updateOne,
    findOne,
    deleteOne
}