import '../Components/indexP';
import { UserData } from '../data/data';
import Myfollower, { Attribute3 } from '../Components/Folder-Followers/follows/follows';
import stylesA from './followers.css';
import Myhead, { Attribute6 } from '../Components/Folder-Tags/head/head';

class AppFollow extends HTMLElement {
	follows: Myfollower[] = [];
	headexplore: Myhead[] = [];
	currentUserIndex: number = 0;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		UserData.forEach((follo) => {
			const followsCard = this.ownerDocument.createElement('custom-follows') as Myfollower;
			followsCard.setAttribute(Attribute3.image, follo.image);
			followsCard.setAttribute(Attribute3.username, follo.username);
			followsCard.setAttribute(Attribute3.name, follo.name);
			this.follows.push(followsCard);
		});
		UserData.forEach((headexplore) => {
			const headcard = this.ownerDocument.createElement('custom-headexplore') as Myhead;
			headcard.setAttribute(Attribute6.image, headexplore.image);
			headcard.setAttribute(Attribute6.username, headexplore.username);
			this.headexplore.push(headcard);
		});
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `

			<style>
			${stylesA}
		</style>
			<custom-backi></custom-backi>
			<nav-app></nav-app>

			`;
			const ContenedorFollo = this.ownerDocument.createElement('section');
			ContenedorFollo.className = 'contenedorfollo';
			this.follows.forEach((follo) => {
				ContenedorFollo?.appendChild(follo);
			});
			this.shadowRoot?.appendChild(ContenedorFollo);
			this.shadowRoot.appendChild(this.headexplore[this.currentUserIndex]);
		}
	}
}

customElements.define('app-follow', AppFollow);
