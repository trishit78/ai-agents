import dotenv from 'dotenv';

import { Agent, run } from '@openai/agents';

dotenv.config();

const agent = new Agent({
    name:'helloAgent',
    instructions:'You are an agent that always says 5 lines about tiger'
});

const result = run(agent, "Hi , i am trishit");

async function init() {
    const output = await result;
    console.log(output.finalOutput)
}

init()