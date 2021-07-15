
function loadSearch(){
  
  let text=document.getElementsByName("searchText")[0].value;
  if(text.localeCompare("")!==0){
    fetch(`http://www.omdbapi.com/?apikey=4fa12616&t=${text}`)
    .then(response=>response.json())
    .then(search=>{
      if(search.Error){
        document.getElementById('resultText').innerHTML=`No results for "${text}"... Try for a different search`;
      }
      else{
        console.log(search.Title)
      }
    })
    .catch(e=>{
        console.log("error :", e)
    })
  }
  else{
    alert("There is nothing to search, try again")
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