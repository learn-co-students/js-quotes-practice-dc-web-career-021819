const QURL = "http://localhost:3000/quotes";

document.addEventListener("DOMContentLoaded", runner());

function runner(e){
  const quoteList = document.getElementById("quote-list");
  let newForm = document.getElementById("new-quote-form");
  newForm.addEventListener("submit", newFormEventHandler);

  fetch(QURL)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let quote = new Quote(item);
      quoteList.appendChild(quote.createQuoteItem());
    })
  })
}

function likeButtonEventHandler(event){
  span = event.currentTarget.childNodes[1];
  let quote = Quote.all.find(quote => quote.likesSpan === span);
  quote.updateLikes();
  fetch(QURL + `/${quote.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote.getQuoteObj())
  })
  .then(res => res.json());

}

function deleteButtonEventHandler(event){
  let quote = Quote.all.find(quote => quote.deleteButton === event.target);
  fetch(QURL + `/${quote.id}`, {
    method: "DELETE"
  })
  .then(res => res.json());
  quote.listItem.remove()
  delete quote;
}

function newFormEventHandler(event){
  event.preventDefault();
  let newForm = document.getElementById("new-quote-form");
  let inputs = newForm.getElementsByTagName("input");
  let obj = { quote: inputs[0].value,
              likes: 0,
              author: inputs[1].value
            };
  fetch(QURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())
  .then(data => {
    let quote = new Quote(data);
    document.getElementById("quote-list").appendChild(quote.createQuoteItem());
  });
}
