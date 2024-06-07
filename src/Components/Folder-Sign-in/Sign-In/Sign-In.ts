import ImgSignin from '../../../assets/Sign Up img.png'
import Styles from './Sign-In.css';
class SingIn extends HTMLElement {
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
				<img src="${ImgSignin}" alt="logosai"  draggable="false"/>
			</div>
				<custom-backforms></custom-backforms>
			</section>
			`;
		}
	}
}

customElements.define('custom-signin', SingIn);
export default SingIn;
