import { create as createSubscriber } from './subscribers'
import { find as findUsers } from './users'
import { io } from '../config'

const wheelRewardTitle = 'Ganhe uma roleta do subscriber'

const createWheelEvent = async (body) => {
    try {
        const fn = availableEvents[body.subscription.type]
        await fn(body.event)
    } catch (e) {}
}

const availableEvents = {
    'channel.channel_points_custom_reward_redemption.add': async (event) => {
        if (event.reward.title !== wheelRewardTitle) return true

        const userName = event.user_name

        const broadcaster = event.broadcaster_user_id
        const code = Buffer.from(broadcaster, 'utf8')
        const broadcasterCode = code.toString('base64')

        const subscriber = await createSubscriber({
            username: userName,
            code: broadcasterCode
        })

        io.emit('selectPrize', {
            code: subscriber.code,
            subscriber: subscriber
        });
    },

    'channel.cheer': async (event) => {
        const userName = event.user_name
        
        const broadcaster = event.broadcaster_user_id
        const code = Buffer.from(broadcaster, 'utf8')
        const broadcasterCode = code.toString('base64')

        const findUser = await findUsers({ code: broadcasterCode })

        if (!findUser[0] || !findUser[0].min_bits_to_wheel) return true

        const minBits = findUser[0].min_bits_to_wheel

        if (event.bits < minBits) return true

        const subscriber = await createSubscriber({
            username: userName,
            code: broadcasterCode
        })

        io.emit('selectPrize', {
            code: subscriber.code,
            subscriber: subscriber
        });
    }
}

export {
    createWheelEvent
}