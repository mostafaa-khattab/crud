var nameInput = document.getElementById("productName");
var priceInput = document.getElementById("productPrice");
var categoryInput = document.getElementById("productCategory");
var descriptionInput = document.getElementById("productDescription");
var serchInput = document.getElementById("serchInput");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertDisc = document.getElementById("alertDisc");

var prouductList = [];

if (localStorage.getItem("list") != null) {

    prouductList = JSON.parse(localStorage.getItem("list"))
    displayProduct();
}
else {
    prouductList = [];
}

var currentindex = 0;
function add() {

}
function addProduct() {

    if (NameValid() == true && priceValid() == true && descValid() == true) {

        var prouduct = {
            name: nameInput.value,
            price: priceInput.value,
            category: categoryInput.value,
            desc: descriptionInput.value
        }
        prouductList.push(prouduct);

        localStorage.setItem("list", JSON.stringify(prouductList))
        displayProduct();
    }
}


function displayProduct() {
    var temp = ""
    for (var i = 0; i < prouductList.length; i++) {
        temp +=
            `
        <tr>
        <td>`+ i + `</td>
         <td>`+ prouductList[i].name + `</td>
         <td>`+ prouductList[i].price + `</td>
         <td>`+ prouductList[i].category + `</td>
         <td>`+ prouductList[i].desc + `</td>
         <td>
         <button class="btn btn-warning " onclick = "updateProduct (`+ i + `)" >update</button>
       </td>
       <td>
         <button class="btn btn-danger" onclick = "deleteProduct(`+ i + `) ">Delete</button>
       </td>
         </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = temp

}

function deleteProduct(x) {
    prouductList.splice(x, 1);
    localStorage.setItem("list", JSON.stringify(prouductList))

    displayProduct();

}

function clearProduct() {
    nameInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";

}

function updateProduct(x) {
    currentindex = x;
    nameInput.value = prouductList[x].name;
    priceInput.value = prouductList[x].price;
    categoryInput.value = prouductList[x].category;
    descriptionInput.value = prouductList[x].desc;

    // document.getElementById("btn-add").innerHTML = "Add Edit"


    document.getElementById("btn-add").style.display = "none";

    document.getElementById("btn-edit").style.display = "inline-block"

}

function editProduct() {

    if (NameValid() == true && priceValid() == true && descValid() == true) {

        prouductList[currentindex].name = nameInput.value;
        prouductList[currentindex].price = priceInput.value;
        prouductList[currentindex].category = categoryInput.value;
        prouductList[currentindex].desc = descriptionInput.value;
        displayProduct()

        localStorage.setItem("list", JSON.stringify(prouductList))

        document.getElementById("btn-add").style.display = "inline-block";

        document.getElementById("btn-edit").style.display = "none"
    }
}

function secrchProduct() {

    var serchValue = serchInput.value.toLowerCase();
    var temp = ""
    for (var i = 0; i < prouductList.length; i++) {

        if (prouductList[i].name.toLowerCase().includes(serchValue) == true ||
            prouductList[i].category.toLowerCase().includes(serchValue) == true)
            temp +=
                `
        <tr>
        <td>`+ i + `</td>
         <td>`+ prouductList[i].name.toLowerCase().replace(serchValue, `<span class= " text-danger fw-bold" >` + serchValue + `</span>`) + `</td>
         <td>`+ prouductList[i].price + `</td>
         <td>`+ prouductList[i].category.toLowerCase().replace(serchValue, `<span class= " text-danger fw-bold" >` + serchValue + `</span>`) + `</td>
         <td>`+ prouductList[i].desc + `</td>
         <td>
         <button class="btn btn-warning " onclick = "updateProduct (`+ i + `)" >update</button>
       </td>
       <td>
         <button class="btn btn-danger" onclick = "deleteProduct(`+ i + `) ">Delete</button>
       </td>
         </tr>
        `


    }
    document.getElementById("tableBody").innerHTML = temp
}


nameInput.addEventListener("blur", NameValid)
function NameValid() {

    var regxName = /^[A-Z][a-z]{2,9}[0-9]?$/
    if (regxName.test(nameInput.value) == true) {

        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        alertName.classList.replace("d-block", "d-none")
        return true;

    }
    else {
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        alertName.classList.replace("d-none", "d-block")
        return false;
    }
}


priceInput.addEventListener("blur", priceValid)
function priceValid() {

    var regxName = /^[1-9][0-9]{2,4}$/
    if (regxName.test(priceInput.value) == true) {

        priceInput.classList.add("is-valid")
        priceInput.classList.remove("is-invalid")
        alertPrice.classList.replace("d-block", "d-none")
        return true;

    }
    else {
        priceInput.classList.add("is-invalid")
        priceInput.classList.remove("is-valid")
        alertPrice.classList.replace("d-none", "d-block")
        return false;
    }
}


descriptionInput.addEventListener("blur", descValid)
function descValid() {

    var regxName = /^[A-Z a-z]{5,50}$/
    if (regxName.test(descriptionInput.value) == true) {

        descriptionInput.classList.add("is-valid")
        descriptionInput.classList.remove("is-invalid")
        alertDisc.classList.replace("d-block", "d-none")
        return true;

    }
    else {
        descriptionInput.classList.add("is-invalid")
        descriptionInput.classList.remove("is-valid")
        alertDisc.classList.replace("d-none", "d-block")
        return false;
    }
}
