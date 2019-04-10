// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
class Quote {

  static all = []

  constructor(quote, likes, author, id=null) {
    this.id = id
    this.quote = quote
    this.likes = likes
    this.author = author
    if (!this.id) {
      this.save()
    }
    Quote.all.push(this)
  }

  quoteHTML() {
    return `
    <li id="${this.id}" class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${this.quote}</p>
        <footer class="blockquote-footer">${this.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${this.likes}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
    `
  }


  delete() {
    const quoteUl = document.getElementById("quote-list")
    const quoteLi = document.getElementById(this.id)
    quoteUl.removeChild(quoteLi)
    fetch(`http://localhost:3000/quotes/${this.id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
    })
  }

  like() {
    const quoteLi = document.getElementById(this.id)
    quoteLi.querySelector("span").innerText = parseInt(quoteLi.querySelector("span").innerText) + 1
    fetch(`http://localhost:3000/quotes/${this.id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({likes: quoteLi.querySelector("span").innerText})
    })
  }

  render() {
    const quoteUl = document.getElementById("quote-list")
    quoteUl.innerHTML += this.quoteHTML()
  }

  save() {
    let data = {
      "quote": this.quote,
      "likes": this.likes,
      "author": this.author
    }
    fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      this.id = response.id
    })
    return this
  }
// End of class
}

// Application
document.addEventListener("DOMContentLoaded", () => {
  // Render Page
  fetch("http://localhost:3000/quotes")
  .then(response => response.json())
  .then(response => {
    response.forEach((quoteObject) => {
      const {id, quote, likes, author} = quoteObject
      new Quote(quote, likes, author, id).render()
    })
  })
  // Listeners
  document.addEventListener("click", (event) => {
    if (event.target.className === "btn btn-primary") {
      addQuote(event)
    }
    if (event.target.className === "btn-danger") {
      quoteToDelete = Quote.all.find((quote) => {
        return quote.id == event.target.parentElement.parentElement.id
      })
      quoteToDelete.delete()
    }
    if (event.target.className === "btn-success") {
      quoteToLike = Quote.all.find((quote) => {
        return quote.id == event.target.parentElement.parentElement.id
      })
      quoteToLike.like()
    }
  })

  function addQuote(event) {
    event.preventDefault()
    let author = document.getElementById("author").value
    let newQuote = document.getElementById("new-quote").value
    let likes = 0
    new Quote(newQuote, likes, author).render()
  }

// end of document loaded
})
