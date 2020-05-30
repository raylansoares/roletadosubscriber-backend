import User from '../models/user'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const find = async (queryParams) => {
    const { user_id = null, access_token = null } = queryParams

    const query = {}
    
    if (user_id) query.user_id = user_id

    if (access_token) query.access_token = access_token

    const users = await User.find(query).sort('-created_at');
    return users
}

const create = async (body) => {
    body.created_at =  dayjs()
    body.updated_at =  dayjs()
    const user = await User.create(body);
    return user
}

const updateOne = async (_id, body) => {
    body.updated_at =  dayjs()
    await User.findOneAndUpdate({ _id: _id}, body);
    const user = await findOne(_id) 
    return user
}

const findOne = async (_id) => {
    const user = await User.findById(_id);
    return user
}

const deleteOne = async (_id) => {
    const user = await User.findByIdAndDelete(_id);
    return user
}

export {
    find,
    create,
    updateOne,
    findOne,
    deleteOne
}