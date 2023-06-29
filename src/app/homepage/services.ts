import {Injectable } from '@angular/core'
import Swiper from 'swiper';

@Injectable()
export class Chatbox {
	public args: any;
	public state: any;
	public messages: any;
	public openButton: any;
	public chatBox: any;
	public sendButton: any;
    public dialogue_tag: any;
    public response_counter: any;

    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            navbar: document.querySelector('.nav')
        }
        this.state = false;
        this.messages = [];
        this.response_counter = 1;
        this.dialogue_tag = 'none';
    }

    display(){
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}: any) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox: any) {
        this.state = !this.state;

        //show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        }
        else{
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox: any){
        let textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === ""){
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        // http://127.0.0.1:5000/dialogue
        fetch('http://127.0.0.1:5000/dialogue', {
            method: 'POST',
            body: JSON.stringify({ message: text1 , dialogue_tag: this.dialogue_tag, response_counter: this.response_counter}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.dialogue_tag = r.dialogue_tag;
                this.response_counter = r.response_counter;
                if (r.answer === 'redirect_to_contact'){
                    window.location.href = '/contact';
                }
                else if (r.answer === 'redirect_to_programmes'){
                    window.location.href = '/courses';
                }
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = '' ;
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox);
                textField.value = '';
            })

    }

    updateChatText(chatbox: any) {
        let html = '';
        this.messages.slice().reverse().forEach(function(item: any){
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }

}

@Injectable()
export class NavbarService {
    fixed_navbar(){
        window.addEventListener('scroll', () => {
            document.querySelector('nav')!.classList.toggle('window-scroll',
             window.scrollY > 0)
        })
    }

    media_navbar(){
        const menu = <HTMLElement>document.querySelector('.nav__menu');
        const openBtn = <HTMLElement>document.querySelector('#open-menu-btn');
        const closeBtn = <HTMLElement>document.querySelector('#close-menu-btn');

        openBtn?.addEventListener('click', () => {
            menu.style.display = 'flex';
            openBtn.style.display = 'none';
            closeBtn.style.display = 'inline-block';
        });
        closeBtn?.addEventListener('click', () => {
            menu.style.display = 'none';
            closeBtn.style.display = 'none';
            openBtn.style.display = 'inline-block';
        });

        //check if the screen is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024){
                menu.style.display = 'flex';
                openBtn.style.display = 'none';
                closeBtn.style.display = 'none';
            } else {
                menu.style.display = 'none';
                openBtn.style.display = 'inline-block';
                closeBtn.style.display = 'none';
            }
        });
    }
}

@Injectable()
export class FaqService {
    toggle_faq(){
        const faqs = document.querySelectorAll('.faq')
        faqs.forEach((faq) => {
            faq.addEventListener('click', () => {
                faq.classList.toggle('open');
                
                const icon = faq.querySelector('.faq__icon i');
                if (icon?.className === 'uil uil-plus'){
                    icon.className = 'uil uil-minus';
                } else if (icon?.className === 'uil uil-minus'){
                    icon.className = 'uil uil-plus';
                }
            })
        })
    }
}

@Injectable()
export class SwiperService {
    swiper(){
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                }
            }
          });
    };
}



