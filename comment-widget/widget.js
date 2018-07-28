
const currentDocument = document.currentScript.ownerDocument;

class CommentWidget extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.attachShadow({mode: 'open'});

		const template = currentDocument.getElementById("comment-widget");
		const instance = template.content.cloneNode(true);
		this.shadowRoot.appendChild(instance);

		const articleId = this.getAttribute('data-article-id');
		//TODO: fetch comments for articleId by ajax
		var comments = [{
				name: "Peter Pan",
				comment: `This is the first comment for article#${articleId}from json data`
			},
			{
				name: "Donald Duck",
				comment: `This is the second comment for article#${articleId}from json data`
			}
		];

		this.render( comments);
	}

	render(comments) {
		let placeholder = this.shadowRoot.getElementById("comment-widget-container");
		comments.forEach(item => {
			let commentPostInstance = currentDocument.createElement("comment-post");
			commentPostInstance.setAttribute("data-name", `-${item.name}`);
			commentPostInstance.setAttribute("data-comment", item.comment);
			placeholder.appendChild(commentPostInstance);
		});
	}
}
window.customElements.define('comment-widget', CommentWidget);



class CommentPost extends HTMLElement {
	constructor() {
		super();
		console.log("*** CommentPost constructor()");
	}

	connectedCallback() {
		console.log("*** CommentPost connectedCallback()");
		const shadowRoot = this.attachShadow({mode: 'open'});

		const template = currentDocument.getElementById("comment-post");
		const instance = template.content.cloneNode(true);
		shadowRoot.appendChild(instance);

		const name = this.getAttribute('data-name');
		const comment = this.getAttribute('data-comment');
		this.render(name, comment);
	}

	render(name, comment){
		console.log("*** CommentPost render()", name, comment);
		this.shadowRoot.getElementById("name").innerHTML = name
		this.shadowRoot.getElementById("comment").innerHTML = comment
	}
}
window.customElements.define('comment-post', CommentPost);
