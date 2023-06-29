import { Component, OnInit, ViewEncapsulation , Renderer2, HostListener} from '@angular/core';
import { Chatbox, FaqService, NavbarService, SwiperService } from './services';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavbarService, FaqService,SwiperService],
})

export class HomepageComponent implements OnInit{
  title = "Chatbot";
  scrollPosition = 0;
  navbarState = 'transparent';

  constructor(private navbarService: NavbarService,
              private faqService : FaqService,
              private swiperService : SwiperService) {}

  ngOnInit(): void {
    const chatBox = new Chatbox();
    chatBox.display();
    this.navbarService.fixed_navbar();
    this.navbarService.media_navbar();
    this.faqService.toggle_faq();
    register();
    this.swiperService.swiper();
  }  
}

