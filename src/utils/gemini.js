import {GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;
const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;