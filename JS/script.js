// Select Elements

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searchMain = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

let mood = "create";

let tmp;

/*---------------------------------------------------*/

// Get Total

price.onkeyup = getTotal;
taxes.onkeyup = getTotal;
ads.onkeyup = getTotal;
discount.onkeyup = getTotal;

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerText = "";
    total.style.backgroundColor = "#af0c0c";
  }
}

/*---------------------------------------------------*/

// Create Product

let dataProduct;

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newPorduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerText,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // Count
  if (title.value != "" && price.value != "" && category.value != "" && newPorduct.count < 100) {
    if (mood === "create") {
      if (newPorduct.count > 1) {
        for (let i = 0; i < newPorduct.count; i++) {
          dataProduct.push(newPorduct);
        }
      } else {
        dataProduct.push(newPorduct);
      }
    } else {
      dataProduct[tmp] = newPorduct;
      mood = "create";
      submit.innerText = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  // Save Localstorage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};

// Clear Inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerText = "";
  count.value = "";
  category.value = "";
  total.style.backgroundColor = "#af0c0c";
}

/*---------------------------------------------------*/

// Read

function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updataData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("delete-all");
  if (dataProduct.length > 0) {
    deleteAll.innerHTML = `
        <button onclick = "deleteAll()">Delete All (${dataProduct.length})</button>
        `;
  } else {
    deleteAll.innerHTML = "";
  }
}

showData();

/*---------------------------------------------------*/

// Delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

/*---------------------------------------------------*/

// Update

function updataData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  total.value = dataProduct[i].total;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerText = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/*---------------------------------------------------*/

// Search

searchTitle.onclick = function () {
  getSearchMood(this.id);
};
searchCategory.onclick = function () {
  getSearchMood(this.id);
};

searchMain.onkeyup = function () {
  searchData(this.value);
};

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick = "updataData(${i})" id="update">Update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
    
    `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick = "updataData(${i})" id="update">Update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
    
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

/*---------------------------------------------------*/
