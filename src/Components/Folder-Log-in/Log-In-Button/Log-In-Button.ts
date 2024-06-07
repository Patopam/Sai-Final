import Styles from './Log-In-Button.css';

import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';
class LogButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		
		const ChangeHome = this.shadowRoot?.querySelector('#changeHome');
		ChangeHome?.addEventListener('click', () => {
			dispatch(navigate('Home'));
		});

		const changeSignIn = this.shadowRoot?.querySelector('#changeSignIn');
		changeSignIn?.addEventListener('click', () => {
			dispatch(navigate('SignIn'));
		});
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

		
				<div class="Box-SingIn">
					<p>Don't have a account?</p>
					<button id="changeSignIn" class="Button-SingIn">Sign in</button>
				</div>

			</section>
			`;
		}
	}
}

customElements.define('custom-logbutton', LogButton);
export default LogButton;
