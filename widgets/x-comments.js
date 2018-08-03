
var comments = {
	0: [],
	1: [{
		name: "Peter Pan",
		comment: `This is the first comment from json data`
	},
	{
		name: "Donald Duck",
		comment: `This is the second comment from json data`
	}],
	2: [{
		name: "Daisy Duck",
		comment: "This is the third comment from json data"
	}]
};


customElements.define("x-comments", class extends HTMLElement {
	connectedCallback(){
		this.sectionElmnt = document.createElement("section");
		this.sectionElmnt.innerHTML = `<i class="title far fa-comments"></i>`;
		this.appendChild(this.sectionElmnt);

		this.articleId = this.getAttribute("article-id");
		setTimeout(this.cb.bind(this), 200);	// ajax call to get comments for articleId
	}

	attributeChangedCallback(name, oldValue, newValue){
		// console.log("*** attributeChangedCallback", name, oldValue, newValue);
		if(name == "article-id" && newValue != oldValue){
			this.articleId = newValue;
			
			setTimeout(this.cb.bind(this), 200);	// ajax call to get comments for articleId
		}
	}

	cb(){
		this.render(comments[this.articleId]);	//TODO: Data is incomming param. (Comes from AJAX or local storage)
	}

	render(comments){
		this.sectionElmnt.innerHTML = `<i class="title far fa-comments"></i>`;

		comments.forEach(item => {
			let commentElmnt = document.createElement("x-comment");
			commentElmnt.setAttribute("name", item.name);
			commentElmnt.setAttribute("comment", item.comment);
			this.sectionElmnt.appendChild(commentElmnt);	
		});

		let newCommentElmnt = document.createElement("x-new-comment");
		newCommentElmnt.addEventListener("commentAdded", this.commentAdded.bind(this));
		
		this.sectionElmnt.appendChild(newCommentElmnt);
	}

	commentAdded(event){
		comments[this.articleId].push(event.detail);
		this.render(comments[this.articleId]);
	}
});
  

customElements.define("x-comment", class extends HTMLElement
{
	connectedCallback(){
		this.name = this.getAttribute("name");
		this.comment = this.getAttribute("comment");

		this.innerHTML = `
			<article>
				<p class="comment">
					${this.comment}
				</p>
				<div class="signature" >
					- <span>${this.name}</span>
				</div>
			</article>
		`;
	}
});


customElements.define("x-new-comment", class extends HTMLElement
{
	connectedCallback(){
		this.innerHTML = `
			<article>
				<p class="comment" contenteditable placeholder="Your comment"></p>
				<div class="signature" >
					- <span contenteditable class="name" placeholder="Your name"></span>
				</div>
				<button style="width: 100%;">Submit</button>
			</article>
		`;

		var submitButton = this.getElementsByTagName("button")[0];
		submitButton.addEventListener("click", this.submit.bind(this));
	}

	submit(){
		let name = this.getElementsByClassName("name")[0].innerHTML;
		let comment = this.getElementsByClassName("comment")[0].innerHTML;
		let evt = new CustomEvent("commentAdded", {detail: { name, comment}});
		this.dispatchEvent(evt);
	}
});




