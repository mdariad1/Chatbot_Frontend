import { Component,OnInit} from '@angular/core';
import { Chatbox,NavbarService } from './services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [NavbarService]
}) 
export class AboutComponent implements OnInit {
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
