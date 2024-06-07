import Styles from './tags.css';
export enum AttributeTa {
	'image' = 'image',
	'trend' = 'trend',
}

class tags extends HTMLElement {
	image?: string;
	trend?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeTa, null> = {
			image: null,
			trend: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: AttributeTa, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
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

				<div class="componente">
					<div class="tag">
						<img class="imagen-tag" src="${this.image}"></img>
            			<h2>${this.trend}</h2>
					</div>
				</div>
      `;
		}
	}
}

customElements.define('custom-trenfe', tags);
export default tags;
