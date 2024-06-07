import { imgs } from '../../../../types/img-post';
import Styles from './welcome.css';
import { addPost } from '../../../../services/firebase';

export enum Attribute5 {
	'image' = 'image',
}

const formDataImg: Omit<imgs, 'id'> = {
	link: '',
	user: '',
	avatarImg: '',
};

class Welcome extends HTMLElement {
	image?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<Attribute5, null> = {
			image: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.loadUserData();
		this.render();
		window.addEventListener('form-change', this.handleFormChange as EventListener);

		const Change1 = this.shadowRoot?.querySelector('#changeFomrs1');
		Change1?.addEventListener('change', this.addLink);

		const save1 = this.shadowRoot?.querySelector('custom-photo');
		save1?.addEventListener('click', this.submitform);

		const save2 = this.shadowRoot?.querySelector('custom-video');
		save2?.addEventListener('click', this.submitform);
	}

	disconnectedCallback() {
		window.removeEventListener('form-change', this.handleFormChange as EventListener);
	}

	handleFormChange(event: Event) {
		const customEvent = event as CustomEvent;
		const { name, value } = customEvent.detail;
		if (name === 'image') {
			this.setAttribute(name, value);
			this.saveToLocalStorage(name, value);
		}
	}

	saveToLocalStorage(name: string, value: string) {
		localStorage.setItem(name, value);
	}

	loadUserData() {
		this.image = localStorage.getItem('image') || '';
	}

	addLink(e: any) {
		formDataImg.link = e?.target?.value;
		formDataImg.user = 'SophiArt';
		formDataImg.avatarImg = 'https://i.pinimg.com/564x/4f/94/9d/4f949d2210e1fe0f62bcc404e54fda45.jpg';
	}

	submitform() {
		addPost(formDataImg);
	}

	attributeChangedCallback(propName: Attribute5, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
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
            <div class="welBar">
                <div class="ImgUser">
                    <img src="${this.image}" alt="User Image"></img>
                </div>
                <input id="changeFomrs1" class="text" type="text" name="Image link" placeholder="Image link">
                <div class="Buttons">
                    <custom-photo></custom-photo>
                </div>
            </div>
            `;
		}
	}
}

customElements.define('custom-welcome', Welcome);
export default Welcome;
