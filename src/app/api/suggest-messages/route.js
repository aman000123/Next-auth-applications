
//OPENAI_API_KEY=xxxxxxxxx

//documents

//https://sdk.vercel.ai/docs/getting-started/nextjs-app-router   taken from here 


//these are prompt configurations

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
//chatgpt me ek ek text likhkar aata ==straming texstresponse
import { NextResponse } from 'next/server';

//next jx me ai integration thoda deffrent hain

//
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// process.env.OPENAI_API_KEY

export const runtime = 'edge';//edge time pr chalta ha next js

export async function POST(req) {
    try {
        //when user click on suggest msg btn then
        //automaticly ai ke pass kuch msg lekar jayenge wo hme kuch mgs bhejega use strea karke response me 
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',//ai models
            max_tokens: 400,//jitna token utna jyada bill
            stream: true,
            prompt,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);//response ko frontend me stram me jana hai chatgpt ki trh
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            // OpenAI API error handling
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            // General error handling
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}