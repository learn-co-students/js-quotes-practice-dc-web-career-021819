document.addEventListener('DOMContentLoaded', initialize)

function initialize(){
  document.querySelector('#quote-list').innerHTML = ""
  getQuotes().then(renderQuotes)
  document.querySelector('.btn-primary').addEventListener('click', newQuote)
}


function newQuote(event){
  event.preventDefault()
  const form = event.target.parentElement
  const text = form.querySelector('#new-quote').value
  const author = form.author.value
  createQuote({quote: text, likes: 0, author: author})
  form.reset()
}

function createQuote(quoteObj){
  const url = `http://localhost:3000/quotes/`
  options = {method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(quoteObj)}
  fetch(url, options).then(resp => resp.json())
  .then(renderQuote)
}

function getQuotes(){
  const url = "http://localhost:3000/quotes"
  return fetch(url).then(resp => resp.json())
}

function renderQuotes(quotes){
  quotes.forEach(renderQuote)
}

function renderQuote(quote){
  const quoteList = document.querySelector('#quote-list')
  const quoteElement = document.createElement('li')

  // quoteElement
  quoteElement.className = 'quote-card'
  quoteElement.id = quote.id
  quoteList.appendChild(quoteElement)

    // quote block
    const quoteBlock = document.createElement('blockquote')
    quoteBlock.className = "blockquote"
    quoteElement.appendChild(quoteBlock)
      // quote text
      const quoteText = document.createElement('p')
      quoteText.className = 'mb-0'
      quoteText.innerText = quote.quote
      quoteBlock.appendChild(quoteText)
      //footer
      const footer = document.createElement('footer')
      footer.className = "blockquote-footer"
      footer.innerText = quote.author
      quoteBlock.appendChild(footer)
      //br
      quoteBlock.appendChild(document.createElement('br'))
      // likeBtn
      const likeBtn = document.createElement('button')
      likeBtn.className = 'btn-success'
      likeBtn.innerText = "Likes: "
      likeBtn.dataset.id = quote.id
      likeBtn.dataset.likes = quote.likes
      likeBtn.addEventListener('click', likeQuote)
      quoteBlock.appendChild(likeBtn)
        // numLikes
        const numLikes = document.createElement('span')
        numLikes.name = "num-likes"
        numLikes.innerText = quote.likes
        likeBtn.appendChild(numLikes)
      // deleteBtn
      const deleteBtn = document.createElement('button')
      deleteBtn.className = "btn-danger"
      deleteBtn.innerText = "Delete"
      deleteBtn.dataset.id = quote.id
      deleteBtn.addEventListener('click', deleteQuote)
      quoteBlock.appendChild(deleteBtn)
}

function likeQuote(event){
  const id = event.target.dataset.id
  let likes = event.target.dataset.likes
  updateLikes({id: id, likes: ++likes})
}

function updateLikes(likeObj){
  const url = `http://localhost:3000/quotes/${likeObj.id}`
  delete likeObj.id
  options = {method: "PATCH",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(likeObj)}
  fetch(url, options)
  .then(resp => resp.json())
  .then(function(quote){
    const quoteElement = document.getElementById(quote.id)
    const likeBtn = quoteElement.querySelector('.btn-success')
    likeBtn.dataset.likes = quote.likes
    likeBtn.firstElementChild.innerText = quote.likes
  })
}

function deleteQuote(event){
  const id = event.target.dataset.id
  const url = `http://localhost:3000/quotes/${id}`
  let options = {method: "DELETE",
  headers: {"Content-Type": "application/json"}}
  fetch(url, options)
  .then(event.target.parentNode.parentNode.remove())
}
