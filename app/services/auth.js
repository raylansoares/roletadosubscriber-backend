import 'dayjs/locale/pt-br'
import axios from 'axios'
import dayjs from 'dayjs'
import { io } from '../config'
import {
  find as findUsers,
  create as createUser,
  updateOne as updateUser
} from '../services/users'

dayjs.locale('pt-br')

const checkAuth = async (headers) => {
  try {
    // Admin access
    const secret = process.env.CLIENT_SECRET
    if ( headers['x-client-secret'] && headers['x-client-secret'] === secret) {
      return true
    }

    if (!headers['x-auth-token'] || !headers['x-code']) return false

    const findUser = await findUsers({
      access_token: headers['x-auth-token'],
      code: headers['x-code']
    })

    if (!findUser[0]) return false

    const validToken = dayjs()
      .subtract(3, 'hour')
      .isBefore(dayjs(findUser[0].expires))

    if (!validToken) return false
  } catch (e) {
    return false
  }

  return true
}

const refreshToken = async (code, token) => {
  try {
    const findUser = await findUsers({
      code: code,
      access_token: token
    })

    if (!findUser[0]) return false

    const refresh_token = findUser[0].refresh_token

    const refreshAccessTokenUrl = getRefreshTokenUrl(refresh_token)
    const refreshTokenResponse = await axios.post(refreshAccessTokenUrl)

    const userData = await updateUser(findUser[0]._id, {
      access_token: refreshTokenResponse.data.access_token,
      refresh_token: refreshTokenResponse.data.refresh_token,
      expires: dayjs()
        .subtract(3, 'hour')
        .add(refreshTokenResponse.data.expires_in, 'second')
    })

    return formatUserResponse(userData)
  } catch (e) {
    return false
  }
}

const makeAuth = async (body) => {
  try {
    const code = body.code
    const redirect = body.redirect

    const generateAccessTokenUrl = getTokenUrl(code, redirect)
    const accessTokenResponse = await axios.post(generateAccessTokenUrl)

    const twitchUserInfoUrl = 'https://api.twitch.tv/helix/users'
    const twitchUserInfoHeaders = {
      'Client-ID': process.env.CLIENT_ID,
      Authorization: `Bearer ${accessTokenResponse.data.access_token}`
    }
    const twitchUserInfoResponse = await axios.get(twitchUserInfoUrl, {
      headers: twitchUserInfoHeaders
    })

    const user = formatUserRequest(
      twitchUserInfoResponse,
      accessTokenResponse
    )

    const findUser = await findUsers({ code: user.code })

    let userData = {}

    if (findUser[0]) {
      userData = await updateUser(findUser[0]._id, user)
    } else {
      userData = await createUser(user)

      await Promise.all([
        followChannel(twitchUserInfoResponse.data.data[0].id),
        EventSub(twitchUserInfoResponse.data.data[0].id)
      ])
    }

    io.emit('joinChannel', {
      channel: userData.login,
      code: userData.code
    })

    return formatUserResponse(userData)
  } catch (e) {
    return false
  }
}

const followChannel = async (userId) => {
  try {
    const twitchUserInfoUrl = 'https://api.twitch.tv/helix/users/follows'
    const twitchUserInfoHeaders = {
      'Client-ID': process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.TOKEN}`
    }
    const data = {
      from_id: process.env.USER_ID,
      to_id: userId.toString()
    }
    return await axios.post(twitchUserInfoUrl, data, {
      headers: twitchUserInfoHeaders
    })
  } catch (e) {}
}

const EventSub = async (userId) => {
  try {
    const twitchEventSubUrl = 'https://api.twitch.tv/helix/eventsub/subscriptions'

    const twitchEventSubHeaders = {
      'Client-ID': process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
      'Content-Type': 'application/json'
    }

    const cheerData = {
      type: 'channel.cheer',
      version: '1',
      condition: {
        broadcaster_user_id: userId
      },
      transport: {
        method: 'webhook',
        callback: `${process.env.SERVER_HOST}/api/webhooks/callback`,
        secret: process.env.CLIENT_SECRET
      }
    }

    const channelPointsData = {
      type: 'channel.channel_points_custom_reward_redemption.add',
      version: '1',
      condition: {
        broadcaster_user_id: userId
      },
      transport: {
        method: 'webhook',
        callback: `${process.env.SERVER_HOST}/api/webhooks/callback`,
        secret: process.env.CLIENT_SECRET
      }
    }

    await Promise.all([
      axios.post(twitchEventSubUrl, cheerData, {
        headers: twitchEventSubHeaders
      }),
      axios.post(twitchEventSubUrl, channelPointsData, {
        headers: twitchEventSubHeaders
      })
    ])
  } catch (e) {}
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
  const code = Buffer.from(twitchUserInfoResponse.data.data[0].id, 'utf8')
  const userCode = code.toString('base64')
  return {
    code: userCode,
    broadcaster_id: twitchUserInfoResponse.data.data[0].id,
    login: twitchUserInfoResponse.data.data[0].login,
    email: twitchUserInfoResponse.data.data[0].email,
    display_name: twitchUserInfoResponse.data.data[0].display_name,
    profile_image_url: twitchUserInfoResponse.data.data[0].profile_image_url,
    access_token: accessTokenResponse.data.access_token,
    refresh_token: accessTokenResponse.data.refresh_token,
    expires: dayjs()
      .subtract(3, 'hour')
      .add(accessTokenResponse.data.expires_in, 'second')
  }
}

const formatUserResponse = (data) => {
  return {
    login: data.login,
    code: data.code,
    broadcaster_id: data.broadcaster_id,
    display_name: data.display_name,
    profile_image_url: data.profile_image_url,
    access_token: data.access_token,
    expires: data.expires
  }
}

export {
  makeAuth,
  checkAuth,
  refreshToken
}
