import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';
import Styles from './head.css';
import logosai from '../../../assets/Iconography - Caesarzkn.png';
export enum Attribute6 {
	'image' = 'image',
	'username' = 'username',
	'uid' = 'uid',
}

class head extends HTMLElement {
	image?: string;
	username?: string;
	uid?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<Attribute6, null> = {
			image: null,
			username: null,
			uid: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.loadUserData();
		this.render();
		window.addEventListener('form-change', this.handleFormChange as EventListener);

		const ChangeHome = this.shadowRoot?.querySelector('#mypro');
		ChangeHome?.addEventListener('click', () => {
			dispatch(navigate('User'));
		});
	}

	disconnectedCallback() {
		window.removeEventListener('form-change', this.handleFormChange as EventListener);
	}

	handleFormChange(event: Event) {
		const customEvent = event as CustomEvent;
		const { name, value } = customEvent.detail;
		if (name === 'username' || name === 'image') {
			this.setAttribute(name, value);
			this.saveToLocalStorage(name, value);
		}
	}

	saveToLocalStorage(name: string, value: string) {
		localStorage.setItem(name, value);
	}

	loadUserData() {
		this.image = localStorage.getItem('image') || '';
		this.username = localStorage.getItem('username') || 'shine'; // Valor predeterminado 'shine'
		this.render();
	}

	attributeChangedCallback(propName: Attribute6, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute6.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;
			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
			<style> ${Styles}</style>

			<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
					<div class="box-head">
                        <div class="box-logo">
                            <img src="${logosai}" alt="logosai"  draggable="false"/>

                        </div>
                        <div class="box-text">
                            <input type="text" class="Bar-text" placeholder="search">

                        </div>
                        <div class="box-Buttons">

                            <div class="box-home" >
                                <button><i class='bx bxs-home'></i></i></button>
                                <p>Home</p>
                            </div>
                            <button><i class='bx bxs-chat bx-tada-hover'></i></button>
                            <button><i class='bx bxs-bell bx-tada-hover'></i></button>


                        </div>
                        <div class="box-user">
                            <img src="${this.image}" class="perfil"></img>
                            <p class="name">${this.username}</p>
                        </div>
                        <div class="box-menu">
                            <button id="mypro"><i class='bx bxs-cog bx-spin-hover' ></i></button>

                        </div>
					</div>

            `;
		}
	}
}

customElements.define('custom-head', head);
export default head;
