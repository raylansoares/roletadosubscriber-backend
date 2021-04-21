import Reward from '../models/reward'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const find = async (queryParams) => {
    const { code = null, name = null } = queryParams

    const query = {}
    
    if (code) query.code = code
    if (name) query.name = name

    try {
        return await Reward.find(query);
    } catch (e) {
        return false
    }
}

const create = async (body) => {
    body.created_at =  dayjs()
    body.updated_at =  dayjs()

    try {
        return await Reward.create(body);
    } catch (e) {
        return false
    }
}

const updateOne = async (_id, body) => {
    body.updated_at =  dayjs()

    try {
        await Reward.findOneAndUpdate({ _id: _id}, body);
        return await findOne(_id) 
    } catch (e) {
        return false
    }
}

const findOne = async (_id) => {
    try {
        return await Reward.findById(_id);
    } catch (e) {
        return false
    }
}

const deleteOne = async (_id) => {
    try {
        return await Reward.findByIdAndDelete(_id);
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