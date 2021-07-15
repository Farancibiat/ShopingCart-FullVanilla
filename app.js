let shoppingCart = {};
const results = document.getElementById("results");
const movies = document.getElementById("movies");

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
  movies.addEventListener("click", (e) => {
    console.log(e.target)
    modifyCart(e)
    drawCartList();
  });
  }
});


function loadSearchOnPress(e) {
  if (e.key === "Enter") {
    loadSearch();
  }
  return false;
}

function loadSearch() {
  let text = document.getElementsByName("searchText")[0].value;
  if (text.localeCompare("") !== 0) {
    fetch(`https://www.omdbapi.com/?apikey=4fa12616&s=${text}`)
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
  let tabledata="";
  let total=0;
  Object.keys(shoppingCart).forEach((movie, index) => {
    movieRow=`<tr>
      <th>${index+1}</th>
      <td>${shoppingCart[movie].title}</td>
      <td class="muted">${shoppingCart[movie].id}</td>
      <td>${shoppingCart[movie].cant}</td>
      <td>
        <button class="add">+</button>
        <button class="quit">-</button>
        <button class="delete">Delete</button>
      </td>
      <td>$ ${shoppingCart[movie].cant*10} USD</td>
     </tr>`;
     tabledata+=movieRow;
     total=total+parseInt(shoppingCart[movie].cant)*10
  });
  document.getElementById("movies").innerHTML = tabledata;
  document.getElementById("total").innerHTML = `$${total} USD`;
  if(Object.keys(shoppingCart).length===0)
    document.getElementById("msg").innerHTML = `Empty Shopping Cart, visit <a href="./index.html">Home</a> to buy some movies`;
  else
  document.getElementById("msg").innerHTML = `Visit <a href="./index.html">Home</a> to add more movies`;
}
  

function resetCart(){
  
  if (localStorage.getItem('shoppingCart')) {
    localStorage.removeItem('shoppingCart')
    shoppingCart = {};
    loadCartLength();
    if(window.location.pathname.localeCompare("/carrito.html")===0){
      drawCartList();
    }

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

function modifyCart(event) {
  if (event.target.classList.contains("quit")) {
    const selectedItem = event.target.parentElement.parentElement;
    if(parseInt(shoppingCart[selectedItem.querySelector('.muted').textContent].cant)>=1){
    shoppingCart[selectedItem.querySelector('.muted').textContent].cant-=1;
    }
    else{
      alert("The Units cant be less than Zero")
    }
  }
  if (event.target.classList.contains("add")) {
    const selectedItem = event.target.parentElement.parentElement;
    
    shoppingCart[selectedItem.querySelector('.muted').textContent].cant+=1;
  
  }
  if (event.target.classList.contains("delete")) {
    const selectedItem = event.target.parentElement.parentElement;
    delete shoppingCart[selectedItem.querySelector('.muted').textContent]
    loadCartLength();
  }
    event.stopPropagation();
  
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}
