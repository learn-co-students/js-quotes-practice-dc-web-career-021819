// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTEPATH = "http://localhost:3000/quotes";

class Quote {
  constructor(params) {
    this.params = params;
    this.li = document.createElement("li");
    const list = document.getElementById("quote-list");
    list.appendChild(this.li);
    this.show();
  }

  edit() {
    console.log(this.params.quote);
    console.log(this.params.author);
    this.li.innerHTML = `<blockquote class="blockquote">
    <textarea class= "quote form-control" name = "quote" type = "text">${this.params.quote} </textarea><br>
    <textarea class = "author form-control" "name = "author" type = "text">${this.params.author}</textarea>
    <br />
    <button class="btn-success">
     Update
    </button>
    <button class="btn-primary">Never Mind</button>
    <button class="btn-danger">Clear Likes ${this.params.likes}</button>
  </blockquote> <br>`;
    this.li.querySelector("button.btn-success").addEventListener("click", () => {
      this.params.quote = this.li.querySelector("textarea.quote").value;
      this.params.author = this.li.querySelector("textarea.author").value;
      this.update();
    });
    this.li.querySelector("button.btn-primary").addEventListener("click", () => {
      this.show();
    });
    const clearLikes = this.li.querySelector("button.btn-danger");
    clearLikes.addEventListener("click", () => {
      this.params.likes = 0;
      clearLikes.innerHTML = "Likes Will Be Cleared";
    });
  }
  update() {
    fetch(QUOTEPATH + `/${this.params.id}`, {
      method: "PATCH",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(this.params)
    }).then(this.show());
  }
  delete() {
    console.log("deleting", this);
    fetch(QUOTEPATH + `/${this.params.id}`, {
      method: "DELETE"
    }).then(e => this.li.remove());
  }
  show() {
    this.li.className = "quote-card";
    this.li.innerHTML = `    <blockquote class="blockquote">
        <p class="mb-0">${this.params.quote}</p>
        <footer class="blockquote-footer">${this.params.author}</footer>
        <br />
        <button class="btn-success">
          Likes: <span>${this.params.likes}</span>
        </button>
        <button class="btn-primary">Edit</button>
        <button class="btn-danger">Delete</button>
      </blockquote> <br>`;
    this.li.querySelector("button.btn-success").addEventListener("click", () => {
      this.like();
    });
    this.li.querySelector("button.btn-danger").addEventListener("click", () => {
      this.delete();
    });
    this.li.querySelector("button.btn-primary").addEventListener("click", () => {
      this.edit();
    });
  }

  like() {
    this.params.likes++;
    this.update();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(QUOTEPATH)
    .then(resp => resp.json())
    .then(quotes => {
      quotes.forEach(q => {
        new Quote(q);
      });
    });

  const form = document.getElementById("new-quote-form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const quote = document.getElementById("new-quote");
    const author = document.getElementById("author");
    const obj = { quote: quote.value, author: author.value, likes: 0 };
    fetch(QUOTEPATH, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(quote => {
        new Quote(quote);
      });
    quote.value = "";
    author.value = "";
  });
});
