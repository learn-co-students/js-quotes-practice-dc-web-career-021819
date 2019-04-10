document.addEventListener('DOMContentLoaded', initialize)

function initialize(){
  getQuotes().then(renderQuotes)
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
      likeBtn.dataset.numLikes = quote.likes
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
  console.log(event.target.parentNode)

}

function deleteQuote(event){
  console.log("it's gone")
}
