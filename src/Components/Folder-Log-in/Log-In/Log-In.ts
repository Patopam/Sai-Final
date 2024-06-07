import ImgLogin from '../../../assets/Log In img.png';
import Styles from './Log-In.css';
class LogIn extends HTMLElement {
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
			<div class="box-img">
				<img src="${ImgLogin}" alt="logosai"  draggable="false"/>
			</div>
				<custom-lbackforms></custom-lbackforms>
			</section>
			`;
		}
	}
}

customElements.define('custom-login', LogIn);
export default LogIn;
