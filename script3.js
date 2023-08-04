

const publicKey = '78be724acf3c021b17b985785965e747';
const privateKey = '2dcc5ae03990719f61bebe83dd167f5a7df31937';
const apiUrl = 'http(s)://gateway.marvel.com/';
const ts = new Date().getTime();

const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
var arr = JSON.parse(localStorage.getItem("favourites"));


function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location = "index2.html";
}


function removeHero(id) {
  var index = arr.indexOf(id);
  console.log(index);
  arr.splice(index, 1);
  console.log(arr);
  localStorage.setItem("favourites", JSON.stringify(arr));
  alert("Your hero has been successfully removed.");
  location.reload();
}


const fetchData = () => {
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
    var id = arr[i]
    fetch(`http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => response.json())
      .then((data) => {
        data = data.data.results[0]
        console.log(data)
        html += `
          <div class="card" style="width: 18rem;">
            <img onclick="showDetails(${arr[i]})" class="card-img-top" src="${data.thumbnail.path}.${data.thumbnail.extension}">
            <div class="card-body">
              <h5 class="card-title" onclick="showDetails(${arr[i]})">${data.name}</h5>
              <span><i class="fa-solid fa-xmark icon" onclick="removeHero(${arr[i]})"></i></span>
            </div>
          </div>
        `;
        document.getElementById("fv-main").innerHTML = html;
      });
  }
};


fetchData();
