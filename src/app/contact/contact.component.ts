import { Component,OnInit} from '@angular/core';
import { Chatbox,NavbarService } from './services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [NavbarService]
})
export class ContactComponent implements OnInit {
  title = "Chatbot";
  scrollPosition = 0;
  navbarState = 'transparent';

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    const chatBox = new Chatbox();
    chatBox.display();
    this.navbarService.fixed_navbar();
    this.navbarService.media_navbar();
  }  
}
