const url = "https://striveschool-api.herokuapp.com/api/product/"

// window.onload = 
async function getProducts() {//restituzione dati dal server
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyOTY1ZTA2MDljZjAwMTg4ZGY1OWMiLCJpYXQiOjE2OTY3NjU1MzQsImV4cCI6MTY5Nzk3NTEzNH0.ASg5bQbXSsiSI_8vBbwayXLwBZR9qmJDo1XWNDFBLAs"
    }

  })
  const data = await response.json()
  const row = document.querySelector("#mScard")
  row.innerHTML = data.map(({ _id, name, description, brand, imageUrl, price }) =>

    `
  <div id="_${_id}" class="card" style="width: 18rem;">
    <a href="./productPage.html">
    <img src="${imageUrl}" class="card-img-top" alt="image">
    </a>
    <div class="card-body">
    <h2>${brand}</h2>
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <a href="#" class="btn btn-primary">${price}</a>
    </div>
  </div>
    `
  ).join("")


  return data
}


//.....................................................................

async function addProducts(event) {//inserimento dati tramite form
  event.preventDefault()

  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/"
    , {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyOTY1ZTA2MDljZjAwMTg4ZGY1OWMiLCJpYXQiOjE2OTY3NjU1MzQsImV4cCI6MTY5Nzk3NTEzNH0.ASg5bQbXSsiSI_8vBbwayXLwBZR9qmJDo1XWNDFBLAs"
      },
      body: JSON.stringify({
        name: nameP.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imgUrl.value,
        price: price.value
      })
    })


  if (response.ok) {//se prodotto inserito correttamente

    alert("Prodotto inserito correttamente")
    const data = await getProducts()
    get(data)


    for (const field of [nameP, description, price, brand, imgUrl]) {
      field.value = ''

    }

  } else {
    console.error("cannot send")
  }
}
//.............................
 async function getProd() {//restituzione dati dal server
  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyOTY1ZTA2MDljZjAwMTg4ZGY1OWMiLCJpYXQiOjE2OTY3NjU1MzQsImV4cCI6MTY5Nzk3NTEzNH0.ASg5bQbXSsiSI_8vBbwayXLwBZR9qmJDo1XWNDFBLAs"
    }

  })
  const data = await response.json()
  const row = document.querySelector("#main-row")
  row.innerHTML = data.map(({ _id, name, description, brand, imageUrl, price }) =>

/*html*/
   `
        <div id="_${_id}" class="row g-2 col-12" style="min-height: 60px">
             <div class="col-2">
                 ${brand} 
             </div>    
             <div class="col-2">
                 ${name} 
             </div>    
             <div class="col-4">
                  ${description}
           </div>   
             <div class="col-2">
             ${imageUrl} 
             </div>    
             <div class="col-2">
             EUR ${price} 
             </div> 
             
           <div class="col-1 d-flex align-items-center justify-content-between">
                 <button class="btn btn-warning px-2" onclick="handleEdit('${_id}')">
                   <i class="bi bi-pencil-square"></i>
              </button>
                 <button class="btn btn-danger px-2" onclick="handleDelete('${_id}')"><i class="bi bi-trash"></i></button>
             </div>
         </div>
    `).join("")

 


  
 } 
 getProd()
//..........................
function get(data) {
  const row = document.querySelector("#main-row")
  row.innerHTML = data.map(({ _id, name, description, price, brand, imageUrl }) => /*html*/
    `
        <div id="_${_id}" class="row g-2 col-12" style="min-height: 60px">
            <div class="col-2">
                ${brand} 
            </div>    
            <div class="col-2">
                ${name} 
            </div>    
            <div class="col-4">
                 ${description}
            </div>   
            <div class="col-2">
            ${imageUrl} 
            </div>    
            <div class="col-2">
            EUR ${price} 
            </div> 
             
            <div class="col-1 d-flex align-items-center justify-content-between">
                <button class="btn btn-warning px-2" onclick="handleEdit('${_id}')">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger px-2" onclick="handleDelete('${_id}')"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    `).join("")
}

async function handleEdit(id) {
  const addProduct = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id)
  const addProductJson = await addProduct.json()
  const { name, description, price, brand, imageUrl } = addProductJson
  const MarketRow = document.querySelector('#_${id}')
  MarketRow.innerHTML = /*html*/
    `
<form class = "container row" onsubmit="handleEditSubmit(event, '${id}')">

<div class="row g-2 ">

<div class="col-2">
<label>brand</label>
<input required name="brand" type="text" class="form-control" value="${brand}">
</div>    

<div class="col-2">
<label>name</label>
<input required name="name" type="text" class="form-control" value="${name}">
</div>    

<div class="col-4">
<label>description</label>
<input required name="description" type="text" class="form-control" value="${description}">
</div>   

<div class="col-2">
<label>imageURL</label>
<input required name="imageUrl" type="text" class="form-control" value="${imageUrl}">
</div>    

<div class="col-2">
<label>price</label>
<input required name="price" type="number" class="form-control" value="${price}">
</div> 
 
<div class="col-1 d-flex align-items-center justify-content-between">

<button type="submit" class="btn btn-success">
<i class="bi bi-check-square-fill"></i>
</button>

<button type="button" class="btn btn-danger" onclick="handleEditCancel()">
<i class="bi bi-x-square-fill"></i>
</button>

</div>
</div>

</form>

`
}

async function handleEditSubmit(e, id) {
  e.preventDefault()
  e.target.classList.add("d-none")
  e.target.querySelector("button[type=submit]").innerHTML = /*html*/
  `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
  </div>
  
  `
  const brand = document.querySelector(`#_${id} [name='brand']`);
  const name = document.querySelector(`#_${id} [name='name']`);
  const description = document.querySelector(`#_${id} [name='description']`);
  const price = document.querySelector(`#_${id} [name='price']`);
  const img = document.querySelector(`#_${id} [name='imageUrl']`);

  const updated = {
      brand: brand.value,
      name: name.value,
      description: description.value,
      price: price.value,
      img: img.value
  }

  try {

      const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyOTY1ZTA2MDljZjAwMTg4ZGY1OWMiLCJpYXQiOjE2OTY3NjU1MzQsImV4cCI6MTY5Nzk3NTEzNH0.ASg5bQbXSsiSI_8vBbwayXLwBZR9qmJDo1XWNDFBLAs",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updated)
      })

      if (response.ok) {
         get(await getProducts())
      } else {
          alert("Something went wrong, cannot update. Check network tab.")
      }

  } catch {
      alert("You are offline.")
  }

}

async function handleEditCancel() {
  get(await getProducts())
}

async function handleDelete(id) {

  if (!confirm("Are you sure you want to delete this product?")) {
      return
  }

  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyOTY1ZTA2MDljZjAwMTg4ZGY1OWMiLCJpYXQiOjE2OTY3NjU1MzQsImV4cCI6MTY5Nzk3NTEzNH0.ASg5bQbXSsiSI_8vBbwayXLwBZR9qmJDo1XWNDFBLAs",
          "Content-Type": "application/json"
      }
  })

  if (response.ok) {
      alert("Event " + id + " deleted!")
      get(await getProducts())
  } else {
      alert("Can't delete this product. Try again later")
  }
}

window.onload = async function () {
  try {
      const productData = await getProducts()
      get(productData)
  } catch (error) {
      console.log(error)
  }
}




const urlPexels = document.querySelector("#url")
urlPexels.innerHTML = /*html*/
  `
<h4>URL di prova</h4>
<ul>
<li>https://images.pexels.com/photos/33961/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600&lazy=load</li>
<li>https://images.pexels.com/photos/10678683/pexels-photo-10678683.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load</li>
<li>https://images.pexels.com/photos/4187560/pexels-photo-4187560.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load</li>
<li>https://images.pexels.com/photos/15007753/pexels-photo-15007753/free-photo-of-natura-impianto-frutta-fresco.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load</li>
<li>https://images.pexels.com/photos/5185446/pexels-photo-5185446.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load</li>
</ul>


`