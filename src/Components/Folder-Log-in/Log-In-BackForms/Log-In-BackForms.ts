import Styles from './Log-In-BackForms.css';
class LogInBackForms extends HTMLElement {
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

				<div class="box-LogUp">
					<h1>Welcome Back</h1>
				</div>
				<div class="names">

				<custom-formsl></custom-formsl>
				<custom-logbutton></custom-logbutton>
				</div>
			</section>
			`;
		}
	}
}

customElements.define('custom-lbackforms', LogInBackForms);
export default LogInBackForms;
