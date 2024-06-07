import likeStyles from './likeButton.css';
class likeButton extends HTMLElement {


	megusta: boolean = false;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}



	corazontoggle() {
		const corazon = this.shadowRoot?.querySelector('#corazon');
		if (this.megusta) {
			corazon?.setAttribute('type', 'regular');
			corazon?.setAttribute('color', '#ffffff');
		} else {
			corazon?.setAttribute('type', 'solid');
			corazon?.setAttribute('color', '#7796F1');
		}
		this.megusta = !this.megusta;
	}
	connectedCallback() {
		this.render();
		this.shadowRoot?.querySelector('#corazon')?.addEventListener('click', () => {
			this.corazontoggle();
		});

	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;
		
			const css = this.ownerDocument.createElement('style');
			css.innerHTML = likeStyles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
			<style> ${likeStyles}</style>

            <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
			

			`;
			const corazon = this.ownerDocument.createElement('box-icon');
			corazon.setAttribute('id', 'corazon');
			corazon.setAttribute('name', 'like');
			corazon.setAttribute('size', 'sm');
			corazon.setAttribute('color', '#ffffff');

			this.shadowRoot.appendChild(corazon)

		}


	}
}

customElements.define('custom-like', likeButton);
export default likeButton;

