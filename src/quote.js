class Quote{
  static all = [];
  constructor(obj){
    this.id = obj.id;
    this.quote = obj.quote;
    this.likes = obj.likes;
    this.author = obj.author;
    Quote.all.push(this);
  }

  getQuoteObj(){
    return {id: this.id, quote: this.quote, likes: this.likes, author: this.author}
  }

  createQuoteItem(){
    this.listItem = document.createElement("li");
    this.listItem.classList.add("quote-card");

    let blockQ = document.createElement("blockquote");
    blockQ.classList.add("blockquote");
    let pQuote = document.createElement("p");
    pQuote.innerText = this.quote;
    pQuote.classList.add("mb-0");
    blockQ.appendChild(pQuote);
    let qFooter = document.createElement("footer");
    qFooter.innerText = this.author;
    qFooter.classList.add("blockquote-footer");
    blockQ.appendChild(qFooter);
    blockQ.appendChild(document.createElement("br"));
    let likeButton = document.createElement("button")
    likeButton.innerText = "Likes: ";
    likeButton.classList.add("btn-success");
    likeButton.addEventListener("click", likeButtonEventHandler)
    this.likesSpan = document.createElement("span");
    this.likesSpan.innerText = this.likes;
    likeButton.appendChild(this.likesSpan)
    blockQ.appendChild(likeButton);
    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("btn-danger");
    this.deleteButton.innerText = "Delete";
    this.deleteButton.addEventListener("click", deleteButtonEventHandler)
    blockQ.appendChild(this.deleteButton);

    this.listItem.appendChild(blockQ);

    return this.listItem;
  }

  updateLikes(){
    this.likes += 1;
    this.likesSpan.innerText = this.likes;
  }
}
