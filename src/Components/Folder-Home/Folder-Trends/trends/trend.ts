import Styles from './trend.css';
export enum Attribute4 {
	'uid' = 'uid',
	'trend' = 'trend',
	'post' = 'post',
}

class trends extends HTMLElement {
	uid?: number;
	trend?: string;
	post?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute4, null> = {
			uid: null,
			trend: null,
			post: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute4, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute4.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;
			case Attribute4.post:
				this.post = newValue ? Number(newValue) : undefined;
				break;
			default:
				this[propName] = newValue;
				break;
		}
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
          
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <div class="Trendss">

						<div class="Tnames">
								<h2>#${this.trend}</h2>
								<p class="number-post">${this.post} Posts</p>
						</div>
            </div>


            `;
		}
	}
}

customElements.define('custom-trends', trends);
export default trends;
