import Styles from './Sign-In-Button.css';

import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';

class SingButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);

	}
	connectedCallback() {
		this.render();

	
		const changeLogIn = this.shadowRoot?.querySelector('#changeLogIn');
		changeLogIn?.addEventListener('click', () => {
			dispatch(navigate('LogIn'));
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


			
				<div class="Box-LogIn">
					<p>Already have an occount?</p>
					<button id="changeLogIn" class="Button-LogIn">Log in</button>

				</div>
				
			</section>
			`;
		}
	}
}

customElements.define('custom-singbutton', SingButton);
export default SingButton;