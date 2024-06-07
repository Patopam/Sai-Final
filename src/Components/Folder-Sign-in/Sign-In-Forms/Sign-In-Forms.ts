import Styles from './Sign-In-Forms.css';
import { users } from '../../../types/users-sign';
import { createUser } from '../../../services/firebase';
import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';

const formData: Omit<users, 'id'> = {
	name: '',
	username: '',
	email: '',
	password: '',
	confirmPass: '',
};

class Forms extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		const changeName = this.shadowRoot?.querySelector('#changeForms1');
		changeName?.addEventListener('change', this.changeName.bind(this));

		const changeUsername = this.shadowRoot?.querySelector('#changeForms2');
		changeUsername?.addEventListener('change', this.changeUsername.bind(this));

		const changeEmail = this.shadowRoot?.querySelector('#changeForms3');
		changeEmail?.addEventListener('change', this.changeEmail.bind(this));

		const changePassword = this.shadowRoot?.querySelector('#changeForms4');
		changePassword?.addEventListener('change', this.changePassword.bind(this));

		const changeConfirmPass = this.shadowRoot?.querySelector('#changeForms5');
		changeConfirmPass?.addEventListener('change', this.changeConfirmPass.bind(this));

		const save = this.shadowRoot?.querySelector('#form');
		save?.addEventListener('submit', this.submitForm.bind(this));

		const save2 = this.shadowRoot?.querySelector('#form');
		save2?.addEventListener('submit', function(event) {
			event.preventDefault();
			dispatch(navigate('Home'));
		})

	}

	changeName(e: any) {
		formData.name = e?.target?.value;
	}

	changeUsername(e: any) {
		formData.username = e?.target?.value;
	}

	changeEmail(e: any) {
		formData.email = e?.target?.value;
	}

	changePassword(e: any) {
		formData.password = e?.target?.value;
	}

	changeConfirmPass(e: any) {
		formData.confirmPass = e?.target?.value;
	}

	async submitForm() {
		try {
			await createUser(formData.email, formData.password, formData.name, formData.username, formData.confirmPass);
			console.log('User registered successfully');
		} catch (error) {
			console.error('Error registering user: ', error);
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
			<style> ${Styles}</style>

			<section>
				<form id="form">
					<div class="box-Forms">
						<input id="changeForms1" class="Forms" type="text" name="Name" placeholder="Name" required>
						<input id="changeForms2" class="Forms" type="text" name="Username" placeholder="Username" required>
						<input id="changeForms3" class="Forms" type="email" name="Email" placeholder="Email" required>
						<input id="changeForms4" class="Forms" type="password" name="Password" placeholder="Password" required>
						<input id="changeForms5" class="Forms" type="password" name="ConfirmPassword" placeholder="Confirm Password" required>
						<button id="changeHome" class="Button-Continue" type="submit" >Continue</button>

					</div>
				
					<custom-singbutton></custom-singbutton>
				</form>
			</section>
			`;
		}
	}
}

customElements.define('custom-forms', Forms);
export default Forms;
