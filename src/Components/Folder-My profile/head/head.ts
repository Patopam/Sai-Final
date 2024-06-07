import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';
import Styles from './head.css';
import logosai from '../../../assets/Iconography - Caesarzkn.png';
export enum Attribute6 {
	'image' = 'image',
	'username' = 'username',
	'uid' = 'uid',
}

class headexplore extends HTMLElement {
	image?: string;
	username?: string;
	uid?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	static get observedAttributes() {
		const attrs: Record<Attribute6, null> = {
			image: null,
			username: null,
			uid: null,
		};

		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
		const ChangeHome = this.shadowRoot?.querySelector('#mypro');
		ChangeHome?.addEventListener('click', () => {
			dispatch(navigate('User'));
		});
	}

	attributeChangedCallback(propName: Attribute6, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute6.uid:
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

						<href ="https://api.fontshare.com/v2/css?f[]=satoshi@500&f[]=cabinet-grotesk@800&display=swap" rel="stylesheet" />
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
					<div class="box-head">
                        <div class="box-logo">
                            <img src="${logosai}" alt="logosai"  draggable="false"/>

                        </div>
                        <div class="box-text">
                            <input type="text" class="Bar-text" placeholder="search">

                        </div>
                        <div class="box-Buttons">

                            <div class="box-home" >
                                <button><i class='bx bxs-home'></i></i></button>
                                <p>Explore</p>
                            </div>
                            <button><i class='bx bxs-chat bx-tada-hover'></i></button>
                            <button><i class='bx bxs-bell bx-tada-hover'></i></button>


                        </div>
                        <div class="box-user">
                            <img src="${this.image}" class="perfil"></img>
                            <p class="name">@${this.username}</p>
                        </div>
                        <div class="box-menu">
							<button id="mypro"><i class='bx bxs-cog bx-spin-hover' ></i></button>

                        </div>
					</div>

            `;
		}
	}
}

customElements.define('custom-heademyuser', headexplore);
export default headexplore;
