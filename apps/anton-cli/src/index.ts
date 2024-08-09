#!/usr/bin/env node
import {AntonSDK} from "@mrck-labs/anton-sdk-test";


const apiKey = process.env.ANTHROPIC_API_KEY

const main = async () => {
    const anton = new AntonSDK({type: 'anthropic', apiKey: apiKey})
    console.log("Anton CLI running...")
    console.log(anton)

    const response = await anton.chat([
        {
            content: 'Hey there, how are you ? :)',
            role: 'user'
        }
    ])

    console.log("This is Anton Response: ")
    console.log(response)
}

main();

