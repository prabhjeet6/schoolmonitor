import { Injectable } from '@angular/core';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
    
  }

  clear() {
    this.messages = [];
  }
}