import { 
	find as findUsers,
	create as createUser,
	updateOne as updateUser
} from '../services/users'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

dayjs.locale("pt-br");

const checkAuth = async (headers) => {
    if (!headers['x-auth-token'] || !headers['x-user-id']) return false

    const findUser = await findUsers({ access_token: headers['x-auth-token'], user_id: headers['x-user-id'] })
    if (!findUser[0]) return false

    const validToken = dayjs().isBefore(dayjs(findUser[0].expires));
    if (!validToken) return false

    return true
}

const makeAuth = async (body) => {
    const code = body.code
    const redirect = body.redirect

    const generateAccessTokenUrl = getTokenUrl(code, redirect)
    const accessTokenResponse = await axios.post(generateAccessTokenUrl)

    const twitchUserInfoUrl = 'https://api.twitch.tv/helix/users'
    const twitchUserInfoHeaders = { 
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': `Bearer ${accessTokenResponse.data.access_token}` 
    }
    const twitchUserInfoResponse = await axios.get(twitchUserInfoUrl, { headers: twitchUserInfoHeaders })

    const user = formatUserRequest(twitchUserInfoResponse, accessTokenResponse)

    const findUser = await findUsers({ user_id: user.user_id })

    let userData = {}

    if (findUser[0]) userData = await updateUser(findUser[0]._id, user)
    else userData = await createUser(user)
    
    return formatUserResponse(userData)
}

const getTokenUrl = (code, redirect) => {
    return 'https://id.twitch.tv/oauth2/token' +
    `?client_id=${process.env.CLIENT_ID}` +
    `&client_secret=${process.env.CLIENT_SECRET}` +
    `&code=${code}` +
    '&grant_type=authorization_code' +
    `&redirect_uri=${redirect}`
}

const formatUserRequest = (twitchUserInfoResponse, accessTokenResponse) => {
    return {
        user_id: twitchUserInfoResponse.data.data[0].id,
        login: twitchUserInfoResponse.data.data[0].login,
        email: twitchUserInfoResponse.data.data[0].email,
        display_name: twitchUserInfoResponse.data.data[0].display_name,
        profile_image_url: twitchUserInfoResponse.data.data[0].profile_image_url,
        access_token: accessTokenResponse.data.access_token,
        expires: dayjs().add(accessTokenResponse.data.expires_in, 'second'),
        refresh_token: accessTokenResponse.data.refresh_token,
    }
}

const formatUserResponse = (data) => {
    return {
        login: data.login,
        user_id: data.user_id,
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