import Styles from './Log-In-Forms.css';
import { signInUser } from '../../../services/firebase';
import { addObserver, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';

class Forms extends HTMLElement {
	formData = {
		email: '',
		password: '',
	};

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();

		const changeEmail = this.shadowRoot?.querySelector('#changeForms3');
		changeEmail?.addEventListener('change', this.changeEmail.bind(this));

		const changePassword = this.shadowRoot?.querySelector('#changeForms4');
		changePassword?.addEventListener('change', this.changePassword.bind(this));

		const save = this.shadowRoot?.querySelector('#form');
		save?.addEventListener('submit', this.submitForm.bind(this));
	}

	changeEmail(e: Event) {
		const target = e.target as HTMLInputElement;
		this.formData.email = target.value;
	}

	changePassword(e: Event) {
		const target = e.target as HTMLInputElement;
		this.formData.password = target.value;
	}

	async submitForm(event: Event) {
		event.preventDefault();
		const errorMessageEl = this.shadowRoot?.querySelector('#error-message');
		if (errorMessageEl) {
			errorMessageEl.textContent = ''; // Clear previous error message
		}

		try {
			const user = await signInUser(this.formData.email, this.formData.password);
			console.log('User signed in successfully', user);
			dispatch(navigate('Home'));
		} catch (error) {
			console.error('Error signing in user: ', error);
			if (errorMessageEl) {
				errorMessageEl.textContent = 'Error signing in: ' + (error as Error).message;
			}
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
                <style>${Styles}</style>
                <section>
                    <form id="form">
                        <div class="box-Forms">
                            <input id="changeForms3" class="Forms" type="email" name="Email" placeholder="Email" required>
                            <input id="changeForms4" class="Forms" type="password" name="Password" placeholder="Password" required>
                            <button id="changeHome" class="Button-Continue" type="submit">Continue</button>
                        </div>
                        <div id="error-message" class="error-message"></div>
                    </form>
                </section>
            `;
		}
	}
}

customElements.define('custom-formsl', Forms);
export default Forms;