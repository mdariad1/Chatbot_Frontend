import { Component,OnInit, ViewEncapsulation} from '@angular/core';
import { Chatbox,NavbarService } from './services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [NavbarService],
})
export class CoursesComponent implements OnInit {
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
