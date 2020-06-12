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
    if (!headers['x-auth-token'] || !headers['x-code']) return false
    
    const findUser = await findUsers({ access_token: headers['x-auth-token'], code: headers['x-code'] })
    if (!findUser[0]) return false
    
    const validToken = dayjs().isBefore(dayjs(findUser[0].expires));
    if (!validToken) return false
   
    const needRefresh = dayjs().add(1, 'hour').isAfter(dayjs(findUser[0].expires));
    if (needRefresh) await refreshToken(headers['x-auth-token'])

    return true
}

const refreshToken = async (token) => {
    const findUser = await findUsers({ access_token: token })
    const refresh_token = findUser[0].refresh_token

    const refreshAccessTokenUrl = getRefreshTokenUrl(refresh_token)
    const refreshTokenResponse = await axios.post(refreshAccessTokenUrl)

    const userData = await updateUser(findUser[0]._id, { 
        access_token: refreshTokenResponse.data.access_token,
        refresh_token: refreshTokenResponse.data.refresh_token
    })

    io.emit('updateToken', formatUserResponse(userData));

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

    const findUser = await findUsers({ code: user.code })

    let userData = {}
    
    if (findUser[0]) {
        userData = await updateUser(findUser[0]._id, user)
    } else {
        userData = await createUser(user)
        io.emit('newChannel');
    }
    
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

const getRefreshTokenUrl = (refreshToken) => {
    return 'https://id.twitch.tv/oauth2/token' +
    `?client_id=${process.env.CLIENT_ID}` +
    `&client_secret=${process.env.CLIENT_SECRET}` +
    '&grant_type=refresh_token' +
    `&refresh_token=${refreshToken}`
}

const formatUserRequest = (twitchUserInfoResponse, accessTokenResponse) => {
    const code = Buffer.from(twitchUserInfoResponse.data.data[0].id, 'utf8');
    const userCode = code.toString('base64')
    return {
        code: userCode,
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