import { 
	find as findUsers,
	create as createUser,
	updateOne as updateUser
} from '../services/users'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';
import { io } from '../config'

dayjs.locale("pt-br");

const checkAuth = async (headers) => {
    try {
        if (!headers['x-auth-token'] || !headers['x-code']) return false
    
        const findUser = await findUsers({
            access_token: headers['x-auth-token'],
            code: headers['x-code']
        })
        if (!findUser[0]) return false
        
        const validToken = dayjs().isBefore(dayjs(findUser[0].expires));

        if (!validToken) return false
    } catch (e) {
        return false
    }

    return true
}

const makeAuth = async (body) => {
    try {
        const userAccessToken = body.token

        const twitchUserInfoUrl = 'https://api.twitch.tv/helix/users'
        const twitchUserInfoHeaders = { 
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': `Bearer ${userAccessToken}` 
        }
        const twitchUserInfoResponse = await axios.get(twitchUserInfoUrl, { 
            headers: twitchUserInfoHeaders 
        })

        const user = formatUserRequest(
            twitchUserInfoResponse,
            userAccessToken
        )

        const findUser = await findUsers({ code: user.code })

        let userData = {}
        
        if (findUser[0]) {
            userData = await updateUser(findUser[0]._id, user)
        } else {
            userData = await createUser(user)
            io.emit('newChannel');
        }

        io.emit('pubSub', {
            channel: twitchUserInfoResponse.data.data[0].id,
            token: userAccessToken
        });
        
        return formatUserResponse(userData)
    } catch (e) {
        return false
    }
}

const formatUserRequest = (twitchUserInfoResponse, userAccessToken) => {
    const code = Buffer.from(twitchUserInfoResponse.data.data[0].id, 'utf8');
    const userCode = code.toString('base64')
    return {
        code: userCode,
        login: twitchUserInfoResponse.data.data[0].login,
        email: twitchUserInfoResponse.data.data[0].email,
        display_name: twitchUserInfoResponse.data.data[0].display_name,
        profile_image_url: twitchUserInfoResponse.data.data[0].profile_image_url,
        access_token: userAccessToken,
        expires: dayjs().add(30, 'days')
    }
}

const formatUserResponse = (data) => {
    return {
        login: data.login,
        code: data.code,
        display_name: data.display_name,
        profile_image_url: data.profile_image_url,
        access_token: data.access_token,
        expires: data.expires,
    }
}

export {
    makeAuth,
    checkAuth
}