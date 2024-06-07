import './screens/home';
import './screens/sign-in';
import './screens/log-in';
import '../src/Components/indexP';
import './screens/followers';
import './screens/trend';
import './screens/user';
import { appState } from './store/store';
import { addObserver } from './store/store';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}
	async render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch ((appState as { screen: string }).screen) {
			case 'SignIn':
				const SignIn = this.ownerDocument.createElement('app-signin');
				this.shadowRoot?.appendChild(SignIn);
				break;

			case 'Home':
				const Home = this.ownerDocument.createElement('app-home');
				this.shadowRoot?.appendChild(Home);
				break;

			case 'LogIn':
				const LogIn = this.ownerDocument.createElement('app-login');
				this.shadowRoot?.appendChild(LogIn);
				break;
			case 'Trend':
				const AppTrend = this.ownerDocument.createElement('app-trends');
				this.shadowRoot?.appendChild(AppTrend);
				break;
			case 'Follow':
				const AppFollow = this.ownerDocument.createElement('app-follow');
				this.shadowRoot?.appendChild(AppFollow);
				break;
			case 'User':
				const AppUser = this.ownerDocument.createElement('app-user');
				this.shadowRoot?.appendChild(AppUser);
				break;
			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
