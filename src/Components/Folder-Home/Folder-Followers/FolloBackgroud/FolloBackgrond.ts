import { addObserver, appState, dispatch } from '../../../../store/store';
import { navigate } from '../../../../store/actions';
import Styles from './FolloBackgrond.css';
class follobackgrond extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		const ChangeHome = this.shadowRoot?.querySelector('#shownf');
		ChangeHome?.addEventListener('click', () => {
			dispatch(navigate('Follow'));
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
			<style> ${Styles}</style>

			<div class="box-followers">
				<div class="Who">
					<h2>Who is follow you </h2>
				</div>
				<div class="Show">
					<button id="shownf">Show more</button>
				</div>
			</div>
            `;
		}
	}
}

customElements.define('custom-follobackgrond', follobackgrond);
export default follobackgrond;