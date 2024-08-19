import {AntonSDK} from "@mrck-labs/anton-sdk";


export const chat = async (args) => {
    const {input, flags}  = args
    console.log({input, flags})
    const apiKey = process.env.ANTHROPIC_API_KEY

    const anton = AntonSDK.create({type: 'anthropic', apiKey: apiKey})

    const response = await anton.chat({
        messages: [
            {
                content: 'Hey there, how are you ? :)',
                role: 'user'
            }
        ]
    })

    console.log("This is response: ")
    console.log(response)
}

