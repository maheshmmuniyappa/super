


const publicKey = '78be724acf3c021b17b985785965e747';
const privateKey = '2dcc5ae03990719f61bebe83dd167f5a7df31937';
const apiUrl = 'http(s)://gateway.marvel.com/';
const ts = new Date().getTime();


const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
console.log(hash)

if (localStorage.getItem("favourites")==null) {
  localStorage.setItem("favourites",JSON.stringify([]));
}else{
  var arr = JSON.parse(localStorage.getItem("favourites"));
}

function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location = "hero-details.html";
}
function addFavourite(id) {
  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("your hero added in favourites")
  }else{
    alert("your hero already added in favourites")
  }
}
const showCorrespondingHeros = () => {
    let inputValue = document.getElementById("my-search").value;
    
    fetch(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        
        data = data.data
        console.log(data)
        let html = "";
        
        if (data.results) {
          
          data.results.forEach((element) => {
            console.log(element)
            html += `
              <div class="card" style="width: 18rem;">
              <div class="card-body">
                    <h5 class="card-title" onclick="showDetails(${element.id})">${element.name}</h5>
                    <span><i id="${element.id}" class="fa-solid fa-plus icon" onclick="addFavourite(${element.id})"></i></span>
                    <img class="card-img-top" onclick="showDetails(${element.id})" src="${element.thumbnail.path}.jpg">
                </div>
                
                
              </div>
            `;
          });
        } else {
          html += `
            <div class="page-wrap d-flex flex-row align-items-center">
              <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-md-12 text-center">
                          <span class="display-1 d-block">404</span>
                          <div class="mb-4 lead">The hero you are looking for was not found.</div>
                      </div>
                  </div>
              </div>
            </div>
          `;
        }
        document.getElementById("superhero-cards").innerHTML = html;
      });
  };
  
  