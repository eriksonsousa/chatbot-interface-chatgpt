import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ChatGptOpenAIResponse, Message, MESSAGE_TYPE, MessagePessoa, OpenAIResponse, Pessoa } from './utility/constants';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './openai.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    MessagePanelComponent, 
    UserInputComponent, 
    HttpClientModule,
    HeaderComponent,
    UserInputComponent,
    MessagePanelComponent
  ],
  providers: [OpenAIService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {


  title = 'Chat Gpt';
  data: Message[] = [];
  //data: MessagePessoa[] = [];
  loading: boolean = false


  constructor(private openaiService: OpenAIService) {}

  
  getMessage($event: string) {
    
    if(!this.loading) {
      
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
      this.loading = true;

      this.openaiService.queryPromptChatGpt($event).subscribe(
        (response: string): void => {
          const content = response;
          console.log("content: ", content);
          messageObject = this.createMessage(content, MESSAGE_TYPE.ASSISTANT)
          this.data = [...this.data].concat(messageObject)
          this.loading = false;
        }
      )

    } else {
      
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)

    }

  }



  createMessage(content: string, type: MESSAGE_TYPE): Message {

    return {

      id: uuidv4(),
      sender: type,
      content: content,
      dateTime: new Date(),
      
    }

  }


  /* teste com api para conexao banco de dados pessoa
  getMessage($event: string) {
    
    if(!this.loading) {
      
      let messageObject: MessagePessoa = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
      this.loading = true;

      this.openaiService.QueryPromptPessoa($event).subscribe(
        (response: Pessoa): void => {
          messageObject = this.createMessage(response.nomePessoa, MESSAGE_TYPE.ASSISTANT)
          this.data = [...this.data].concat(messageObject)
          this.loading = false;
        }
      )

    } else {
      
      let messageObject: MessagePessoa = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)

    }

  }



  createMessage(nomePessoa: string, type: MESSAGE_TYPE): MessagePessoa {

    return {

      id: uuidv4(),
      sender: type,
      nomePessoa: nomePessoa,
      dateTime: new Date(),
      
    }

  }
  */



  /* original
  getMessage($event: string){
    if(!this.loading){
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
      this.loading = true;

      this.openaiService.QueryPrompt($event).subscribe(
        (response: OpenAIResponse): void => {
          messageObject = this.createMessage(response.content.replace(/【[0-9]*†source】/g, ''), MESSAGE_TYPE.ASSISTANT)
          this.data = [...this.data].concat(messageObject)
          this.loading = false;
        })
    }
    else{
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
    }
  }
  */

  /*
  createMessage(content: string, type: MESSAGE_TYPE): Message{
    return {
      id: uuidv4(),
      sender: type,
      content: content,
      dateTime: new Date(),
    }
  }
  */


 
  public debounce(func: Function, timeout = 400) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  
}
