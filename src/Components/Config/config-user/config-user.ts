import Styles from './config-user.css';

export enum Attribute3 {
	'image' = 'image',
	'username' = 'username',
	'name' = 'name',
	'uid' = 'uid',
}

class CoUser extends HTMLElement {
	image?: string;
	username?: string;
	name?: string;
	uid?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.handleClick = this.handleClick.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<Attribute3, null> = {
			image: null,
			username: null,
			name: null,
			uid: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.loadUserData();
		this.render();
		window.addEventListener('form-change', this.handleFormChange as EventListener);
	}

	disconnectedCallback() {
		window.removeEventListener('form-change', this.handleFormChange as EventListener);
	}

	attributeChangedCallback(propName: Attribute3, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute3.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	handleClick() {
		const newImage = prompt('Enter new image URL:');
		if (newImage) {
			this.image = newImage;
			this.setAttribute('image', newImage);
			this.saveToLocalStorage('image', newImage);
			this.render();
		}
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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
            <style> ${Styles}</style>
            <section class= "user">
                <div class="top">
                    <img src="${this.image}" onclick="this.parentElement.parentElement.parentElement.handleClick()"></img>
                    <h1>${this.name}</h1>
                    <h2>${this.username}</h2>
                </div>
            </section>
            `;
		}
	}
}

customElements.define('custom-confiuser', CoUser);
export default CoUser;
