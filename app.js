let shoppingCart = {};

document.addEventListener('DOMContentLoaded', e => {
  
  if (localStorage.getItem('shoppingCart')) {
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
      loadCartLength();
  }
  if(window.location.pathname.localeCompare("/index.html")===0){
    results.addEventListener("click", (e) => {
      addToCart(e);
    });
  }
  if(window.location.pathname.localeCompare("/carrito.html")===0){
  console.log(shoppingCart)
  drawCartList();
  }
});
const results = document.getElementById("results");

function loadSearchOnPress(e) {
  if (e.key === "Enter") {
    loadSearch();
  }
  return false;
}

function loadSearch() {
  let text = document.getElementsByName("searchText")[0].value;
  if (text.localeCompare("") !== 0) {
    fetch(`http://www.omdbapi.com/?apikey=4fa12616&s=${text}`)
      .then((response) => response.json())
      .then((search) => {
        if (search.Error) {
          document.getElementById(
            "results"
          ).innerHTML = `<h3>No results for "${text}"... Try for a different search</h3>`;
        } else {
          drawResults(search);
        }
      })
      .catch((e) => {
        console.log("error :", e);
      });
  } else {
    alert("There is nothing to search, try again");
  }
}

function drawResults(results) {
  let movies = results.Search;
  let htmlCode = "";
  movies.forEach((movieInfo, index) => {
    if(index<9){
    let movieCard = `<div class="card">
    <div style="width:300px; height: 330px"" >
    <img class="movieImg" src="${movieInfo.Poster}" alt="${movieInfo.imbdID}" 
    height="330px" style="width:100%"></div>
    <h4 class="title">${movieInfo.Title}</h4>
    <p class="price">$9.99 USD</p>
    <div>
    <span><strong>Year: </strong></span><span class="year">${movieInfo.Year}</span></div>
    <label for="cant"><strong> Units: </strong></label>
    <input type="number" name="cant" class="cant" value=1 min="1" max="5"/>
    <button class="cartButton" data-id=${movieInfo.imdbID}>Add Reserve</button>
    </div>`;
    htmlCode += movieCard;
    }
  });
  document.getElementById("results").innerHTML = htmlCode;
}

function drawCartList() {
  tabledata="";
  Object.keys(shoppingCart).forEach((movie, index) => {
    movieRow=`<tr>
      <th>${index+1}</th>
      <td>${shoppingCart[movie].title}</td>
      <td>${shoppingCart[movie].cant}</td>
      <td>
        <button class="add">+</button>
        <button class="quit">-</button>
      </td>
      <td>$ ${shoppingCart[movie].cant*10} USD</td>
     </tr>`;
     tabledata+=movieRow;
  });
  document.getElementById("movies").innerHTML = tabledata;
}
  
function addMovie(movieObject) {
  favorites.push(movieObject);
  favorites.array.forEach((element) => {
    console.log(element);
  });
}
function resetCart(){
  
  if (localStorage.getItem('shoppingCart')) {
    localStorage.removeItem('shoppingCart')
    shoppingCart = {};
    loadCartLength();
}

}
function respBehavior() {
  var x = document.getElementById("myMenu");
  if (x.className === "menu") {
    x.className += " responsive";
  } else {
    x.className = "menu";
  }
}
function loadCartLength(){
  let itemCount=document.getElementById('cartLength')
  itemCount.innerText=Object.keys(shoppingCart).length;
}
function addToCart(event) {
  if (event.target.classList.contains("cartButton")) {
    const selectedItem = event.target.parentElement;
    let cartItem = {
      id: selectedItem.querySelector(".cartButton").dataset.id,
      title: selectedItem.querySelector(".title").textContent,
      img: selectedItem.querySelector(".movieImg").getAttribute("src"),
      cant: parseInt(selectedItem.querySelector(".cant").value),
    };

    if (shoppingCart.hasOwnProperty(cartItem.id)) {
      cartItem.cant += parseInt(shoppingCart[cartItem.id].cant);
    }
    shoppingCart[cartItem.id] = { ...cartItem };
    loadCartLength();
    event.stopPropagation();
  }
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}
