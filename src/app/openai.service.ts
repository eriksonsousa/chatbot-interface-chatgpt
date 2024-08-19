import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ChatGptOpenAIResponse, OpenAIResponse, Pessoa } from './utility/constants';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  //api_url: string = "https://fast-server-api-default-ae8642698ddc.herokuapp.com/";
  //api_url: string = "http://localhost:8080/pessoa/";
  api_url: string = "http://localhost:8080/bot/";

  constructor(private http: HttpClient) { }

  /*
  QueryPrompt(prompt: string): Observable<OpenAIResponse>{
    return this.http.post<any>(`${this.api_url}queryAssistant`, { prompt}).pipe(catchError(this.error));
  }
  */


  QueryPromptPessoa(prompt: string): Observable<Pessoa>{
    return this.http.get<any>(`${this.api_url}carregandoPessoa/${prompt}`).pipe(catchError(this.error));
  }

  queryPromptChatGpt(prompt: string): Observable<string>{
    return this.http.get(`${this.api_url}chat?prompt=${prompt}`, { responseType: 'text' }).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
