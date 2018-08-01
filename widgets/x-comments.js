
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

	cb(){
		comments[this.articleId].forEach(item => {
			let commentElmnt = document.createElement("x-comment");
			commentElmnt.setAttribute("name", item.name);
			commentElmnt.setAttribute("comment", item.comment);
			this.sectionElmnt.appendChild(commentElmnt);	
		});

		let newCommentElmnt = document.createElement("x-new-comment");
		this.sectionElmnt.appendChild(newCommentElmnt);
		
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
	//TODO: handle button click -> add to comments and clear
	connectedCallback(){
		this.innerHTML = `
			<article>
				<p class="comment" contenteditable>
					Your comment
				</p>
				<div class="signature" >
					- <span contenteditable>Your name</span>
				</div>
				<button style="width: 100%;">Submit</button>
			</article>
		`;
	}
});




