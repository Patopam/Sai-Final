import Styles from './config-forms.css';

class CoForms extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	connectedCallback() {
		this.render();
		this.addEventListeners();
		this.loadFormData();
	}

	addEventListeners() {
		const inputs = this.shadowRoot?.querySelectorAll('.Forms');
		if (inputs) {
			inputs.forEach((input) => {
				input.addEventListener('input', this.handleInputChange);
			});
		}
	}

	handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const { name, value } = target;
		this.saveToLocalStorage(name, value);
		this.dispatchEvent(
			new CustomEvent('form-change', {
				detail: { name, value },
				bubbles: true,
				composed: true,
			})
		);
	}

	saveToLocalStorage(name: string, value: string) {
		localStorage.setItem(name, value);
	}

	loadFormData() {
		const inputs = this.shadowRoot?.querySelectorAll('.Forms') as NodeListOf<HTMLInputElement>;
		inputs.forEach((input) => {
			const storedValue = localStorage.getItem(input.name);
			if (storedValue) {
				input.value = storedValue;
			}
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
            <style> ${Styles}</style>
            <section>
                <div class="box-Forms">
                    <input class="Forms" type="text" name="name" placeholder="Name">
                    <input class="Forms" type="text" name="lastname" placeholder="Lastname">
                    <input class="Forms" type="email" name="username" placeholder="Username">
                    <input class="Forms" type="password" name="email" placeholder="Email">
                    <input class="Forms" type="password" name="password" placeholder="Password">
                    <input class="Forms" type="url" name="image" placeholder="Image URL">
                </div>
            </section>
            `;
		}
	}
}

customElements.define('custom-coforms', CoForms);
export default CoForms;
