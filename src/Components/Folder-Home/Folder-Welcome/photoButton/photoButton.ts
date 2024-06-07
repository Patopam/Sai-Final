import Styles from './photoButton.css';
import { uploadfile } from '../../../../services/firebase';
class PhotoButton extends HTMLElement {
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

			<div class="box">
        		<button class="button">
		
          		<div class="overlap-group">
            		<div class="text-wrapper">Photo</div>
           		<div class="rectangle"></div>
          	</div>
		  
        		</button>
      			</div>
			`;
		
		}
	}
}

customElements.define('custom-photo', PhotoButton);
export default PhotoButton;
