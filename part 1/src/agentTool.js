import dotenv from 'dotenv';

import { Agent, run, tool } from '@openai/agents';
import z from 'zod';
import axios from 'axios';
import {init} from './email.js'
dotenv.config();

const getWeather = tool({
    name:'get_weather',
    description:'Return the weather of a city',

    parameters:z.object({city:z.string()}),
    async execute({city}){
        const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
        const response = await axios.get(url,{responseType:'text'});
        return `The weather of the ${city} is ${response.data}`
    }
})

const sendEmailTool = tool({
    name:'send_email',
    description:'This tool sends an email',
    parameters:z.object({
        toEmail:z.string().describe('email address to'),
        subject:z.string().describe('subject'),
        body:z.string().describe('body of the email')
    }),
    execute: async function ({body,subject,toEmail}) {
        init({body,subject,toEmail})
        console.log('email sent')
    }
})


const agent = new Agent({
    name:'Weather forecast agent',
    instructions:'You are an agent that will return the weather of a city',
    tools:[getWeather,sendEmailTool]
});

async function new_init(data) {
    const output = await run(agent,data);
    console.log(output.finalOutput)
}

new_init('What is the weather of kolkata? send it in a email to trishit456@gmail.com')