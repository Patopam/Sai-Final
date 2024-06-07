class SingIn extends HTMLElement {

constructor() {
    super();
    this.attachShadow({ mode: 'open' });
}

connectedCallback(){
    this.render()
}
render(){
    if (this.shadowRoot) this.shadowRoot.innerHTML= ``;
    const card = this.ownerDocument.createElement('custom-signin')
    this.shadowRoot?.appendChild(card)
}

}

customElements.define('app-signin', SingIn)