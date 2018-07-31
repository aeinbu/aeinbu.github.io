var comments = [{
		name: "Peter Pan",
		comment: `This is the first comment from json data`
	},
	{
		name: "Donald Duck",
		comment: `This is the second comment from json data`
	}
];

xtag.create('x-comments', class extends XTagElement {
	constructor(){
		super();
	}
	set 'articleId::attr'(value){
		this.articleId = value;

		console.log("*** starting timeout...");
		setTimeout(this.callback.bind(this), 200);
	}

	callback(){
		console.log("*** timeout callback...");
		this.render();
	}

	'::template' () {
		return `
			<div>
				<i class="title far fa-comments"></i>
				${ 
					"".concat(...comments.map(({comment, name}) =>
						`<x-comment name="${name}" comment="${comment}"></x-comment>`
					))
				}
				<x-comment name="Your name" comment="Your comment..." empty="true"><x-comment>
			</div>
		`;
	}
});


xtag.create('x-comment', class extends XTagElement {
	set 'name::attr'(value){
		this.name = value;
	}

	set 'comment::attr'(value){
		this.comment = value;
	}

	set 'empty::attr(Boolean)'(value){
		this.isEmpty = value;
	}

	'::template(true)' () {
		return `
			<article>
				<p class="comment" contenteditable="${this.isEmpty}">
					${this.comment}
				</p>
				<div class="signature" >
					- <span contenteditable="${this.isEmpty}">${this.name}</span>
				</div>
				${ this.isEmpty? `<button style="width: 100%">Submit</button>`: ""}
			</article>
		`;
	}
});
