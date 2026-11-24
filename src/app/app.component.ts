import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'Customer' | 'You';
  text: string;
  timestamp: Date;
}

const COMPLAINTS = [
  'My order arrived late and I never received an update. Can you help?',
  'I was charged twice for my last order. How can I get a refund?',
  'The item I received is damaged. What should I do next?',
  'I have been trying to reset my password, but the email never arrives.',
  'My delivery is marked as complete, but I have not received it.',
  'I contacted support last week and have not heard back yet.'
];

@Component({
  selector: 'app-root',
  imports: [DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  messages: Message[] = [];
  reply = '';

  constructor() {
    this.postComplaint();
  }

  postComplaint(): void {
    const text = COMPLAINTS[Math.floor(Math.random() * COMPLAINTS.length)];
    this.messages.push({ sender: 'Customer', text, timestamp: new Date() });
  }

  sendReply(): void {
    const text = this.reply.trim();
    if (!text) {
      return;
    }

    this.messages.push({ sender: 'You', text, timestamp: new Date() });
    this.reply = '';
  }
}
