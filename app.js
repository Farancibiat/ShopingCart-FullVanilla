
function loadApi(){
    fetch("http://www.omdbapi.com/?apikey=4fa12616&i=tt3896198")
    .then(response=>response.json())
    .then(search=>{
        console.log(search.Title)
    })
    .catch(e=>{
        console.log("error :", e)
    })
}

function respBehavior() {
    var x = document.getElementById("myMenu");
    if (x.className === "menu") {
      x.className += " responsive";
    } else {
      x.className = "menu";
    }
  }