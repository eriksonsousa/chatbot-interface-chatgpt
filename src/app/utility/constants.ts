export interface Message {
    id: string,
    sender: string,
    content: string,
    dateTime: Date,
}


export enum MESSAGE_TYPE {
    USER = "user",
    ASSISTANT = "assistant"
}


export interface OpenAIResponse {
    content: string, 
    run_id: string, 
    thread_id: string
}


export interface MessagePessoa {
    id: string,
    sender: string,
    nomePessoa: string,
    dateTime: Date,
}


export interface Pessoa {
    id: string, 
    nomePessoa: string, 
    sobreNomePessoa: string
}


export interface ChatGptOpenAIResponse {
    //id: string, 
    content: string
}