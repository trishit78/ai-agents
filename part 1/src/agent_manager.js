import dotenv from 'dotenv';

import { Agent, run, tool } from '@openai/agents';
import z from 'zod';

dotenv.config();

const fetchPlans = tool({
    name:'fetch_plans',
    descriptions:'fetching all the internet plans available',
    parameters:z.object({}),
    execute: async function () {
        return [
            { plan_id: '1', price_inr: 399, speed: '30MB/s' },
            { plan_id: '2', price_inr: 999, speed: '100MB/s' },
            { plan_id: '3', price_inr: 1499, speed: '200MB/s' },
        ]
    }
})

const processRefund = new Agent({
    name:'processing_refund',
    descriptions:'giving the refunds back',
    parameters:z.object({
        customerId:z.string().describe('id of the customer'),
        reason:z.string().describe('reason of the refund')
    }),
    execute:async function ({customerId,reason}) {
        console.log(`${customerId} got the refund of ... amount because of ${reason}`)
        return 'refund successfull'
    }
})


const Refund_Agent = new Agent({
    name:'refund_agent',
    instructions:'You are agent who handles all the refunds in the company',
    tools:[processRefund]
})


const SalesAgent = new Agent({
    name:'sales_agent',
    instructions:'You are an agent who is an expert on sales',
    tools:[fetchPlans,
        Refund_Agent.asTool({
            toolName: 'refund_expert',
            toolDescription: 'Handles refund questions and requests.',
        })
    ]
});


async function init(data) {
    const output = await run(SalesAgent,data);
    console.log(output.finalOutput)
}

init('hi, i am trishit, i want refund on 399 plan because of shifting to a new city , bought plan this month,not used, yes')