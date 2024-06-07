import Styles from './feed.css';
import { getPost } from '../../../../services/firebase';
import { imgs } from '../../../../types/img-post';

export enum Attribute2 {
	'image' = 'image',
	'username' = 'username',
	'postimage' = 'postimage',
}

class feed extends HTMLElement {
	image?: string;
	username?: string;
	postimage?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute2, null> = {
			image: null,
			username: null,
			postimage: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute2, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.render();
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
        <style> ${Styles}</style>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="componente">
          <div class="info">
            <img src="${this.image}" class="imagen-usuario"></img>
            <p>@${this.username}</p>
          </div>
          <div class="post">
            <img class="imagen-post" src="${this.postimage}"></img>
          </div>
          <div class="box-like">
            <custom-like></custom-like>
          </div>
        </div>
      `;

			const postImage = this.shadowRoot.querySelector('.post .imagen-post') as HTMLImageElement;
			postImage.addEventListener('click', this.openPopup.bind(this));
		}
	}

	openPopup() {
		const popup = document.createElement('div');
		popup.classList.add('popup');
		popup.innerHTML = `
        <div class="popup-content">
            <img src="${this.postimage}" class="popup-image"></img>
            <span class="close-popup">&times;</span>
            <p class="comment">${this.getRandomMessage()}</p>
        </div>
    `;
		this.shadowRoot?.appendChild(popup);

		const comment = popup.querySelector('.comment') as HTMLElement;
		setTimeout(() => {
			comment.classList.add('show');
		}, 100);

		// Agregar clase al body para el fondo oscuro y semitransparente
		document.body.classList.add('popup-open');

		const closeButton = popup.querySelector('.close-popup') as HTMLElement;
		closeButton.addEventListener('click', () => {
			popup.remove();
			// Quitar la clase del body cuando se cierra el popup
			document.body.classList.remove('popup-open');
		});
	}

	getRandomMessage() {
		const messages = [
			'¡Qué bonita imagen!',
			'Me encanta esta foto',
			'¡Hermosa imagen!',
			'¡Excelente composición!',
			'Increíble captura',
			'¡Fascinante imagen!',
			'¡Me encanta!',
		];
		return messages[Math.floor(Math.random() * messages.length)];
	}
}

customElements.define('custom-feed', feed);
export default feed;
