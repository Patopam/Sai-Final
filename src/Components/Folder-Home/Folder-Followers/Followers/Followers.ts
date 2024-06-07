import Styles from './Followers.css';
export enum Attribute3 {
	'image' = 'image',
	'username' = 'username',
    'name' = 'name',
	'uid' = 'uid'
	
}

class followers extends HTMLElement {
	image?: string;
	username?: string;
    name?: string;
	uid?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute3, null> = {
			image: null,
			username: null,
            name: null,
			uid:null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute3, oldValue: string | undefined, newValue: string | undefined) {
		switch(propName){
            case Attribute3.uid:
                this.uid = newValue ? Number(newValue) : undefined;
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
            
			
					<div class="infoFollo">
						<div class="ImgUsuario">
							<img src="${this.image}" class="imagen-usuario"></img>
						</div>
						<div class="names">
								<p class="name-follower">${this.name}</p>
								<p class="username-follower">@${this.username}</p>
						</div>
						<div class="box-button ">
							<custom-button></custom-button>
						</div>
					</div>
			
            `;
		}
	}
}

customElements.define('custom-followers', followers);
export default followers;