customElements.define("x-article", class extends HTMLElement{
	connectedCallback(){
		this.addEventListener("click", this.showArticle.bind(this));
	}

	showArticle(){
		this._div = document.createElement("div");
		this._div.id = "background";
		this._div.style.zIndex = 1;
		this._div.innerHTML = `
			<div id="floater"></div>
			<div id="overlay">
				<div id="closer">&times;</div>
				${this.innerHTML}
			</div>
			`;

		document.body.insertBefore(this._div, document.body.firstChild);


		document.getElementById("closer").addEventListener("click", this.hideArticle.bind(this));
		document.getElementById("background").addEventListener("click", this.hideArticle.bind(this));
		document.addEventListener("keyup", (event) => {
			if(event.keyCode === 27){
				this.hideArticle(event);
			}
		});

	}

	hideArticle(event){
		document.body.removeChild(this._div);
		event.stopPropagation();
	}
});




