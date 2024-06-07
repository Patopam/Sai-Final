import Styles from './Sign-In-BackForms.css';
class SingInBackForms extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
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

			<section>

				<div class="box-signUp">
					<h1>Sign Up</h1>
				</div>
				<custom-forms></custom-forms>
				
			</section>
			`;
		}
	}
}

customElements.define('custom-backforms', SingInBackForms);
export default SingInBackForms;