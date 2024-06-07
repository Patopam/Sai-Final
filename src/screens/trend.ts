import '../Components/indexP';
import { trendData } from '../data/trendsData';
import { UserData } from '../data/data';
import Mytag, { AttributeTa } from '../Components/Folder-Tags/tags/tags';
import stylesB from './trend.css';
import Myhead, { Attribute6 } from '../Components/Folder-Tags/head/head';

class AppTrend extends HTMLElement {
	tags: Mytag[] = [];
	headexplore: Myhead[] = [];
	currentUserIndex: number = 0;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		trendData.forEach((tag) => {
			const tagCard = this.ownerDocument.createElement('custom-trenFe') as Mytag;
			tagCard.setAttribute(AttributeTa.image, tag.image);
			tagCard.setAttribute(AttributeTa.trend, tag.trend);
			this.tags.push(tagCard);
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
			${stylesB}
		</style>
			<custom-back></custom-back>
			<custom-headexplore></custom-headexplore>
			<nav-app></nav-app>

			`;

			const ContenedorTag = this.ownerDocument.createElement('section');
			ContenedorTag.className = 'contenedortag';
			this.tags.forEach((tag) => {
				ContenedorTag?.appendChild(tag);
			});
			this.shadowRoot?.appendChild(ContenedorTag);

			this.shadowRoot.appendChild(this.headexplore[this.currentUserIndex]);
		}
	}
}

customElements.define('app-trends', AppTrend);
