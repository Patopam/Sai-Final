import { addObserver, appState, dispatch } from '../../../store/store';
import { navigate } from '../../../store/actions';
import Styles from './tags-back.css';

class FollBacki extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		const ChangeHome = this.shadowRoot?.querySelector('#goback');
		ChangeHome?.addEventListener('click', () => {
			dispatch(navigate('Home'));
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = Styles;
			this.shadowRoot?.appendChild(css);

			this.shadowRoot.innerHTML = `
                <style> ${Styles}</style>
                <div class="title2">
                    <div class="now">
                        <h1>Here are some people you might know</h1>
                    </div>

                    <div class="go">
                        <button id="goback">Back to Home</button>
                    </div>

                </div>
            `;
		}
	}
}

customElements.define('custom-backi', FollBacki);

export default FollBacki;
