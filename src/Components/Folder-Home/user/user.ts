import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';
import Styles from './user.css';
export enum Attribute {
	'image' = 'image',
	'name' = 'name',
	'username' = 'username',
	'followers' = 'followers',
	'following' = 'following',
}

class User extends HTMLElement {
	name?: string;
	image?: string;
	username?: string;
	following?: number;
	followers?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			name: null,
			image: null,
			username: null,
			followers: null,
			following: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.loadUserData();
		this.render();
		window.addEventListener('form-change', this.handleFormChange as EventListener);

		const ChangeHome = this.shadowRoot?.querySelector('#myProfile');
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
		if (name === 'name' || name === 'username' || name === 'image') {
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
		this.name = localStorage.getItem('name') || 'sofia'; // Valor predeterminado 'sofia'
		this.render();
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.following:
				this.following = newValue ? Number(newValue) : undefined;
				break;
			case Attribute.followers:
				this.followers = newValue ? Number(newValue) : undefined;
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
			<section class="user">
				<div class="top">
					<img src="${this.image}" alt="User Image"></img>
					<h1>${this.name}</h1>
					<h2>${this.username}</h2>
				</div>
				<section class="bottom">
					<div class="following">
						<h1>${this.following}</h1>
						<h2>Following</h2>
					</div>
					<div class="follower">
						<h1>${this.followers}</h1>
						<h2>Followers</h2>
					</div>
					<div class="myProfile">
						<button id="myProfile">My profile</button>
					</div>
				</section>
			</section>
			`;
		}
	}
}

customElements.define('custom-user', User);
export default User;
