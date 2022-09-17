
const search = () =>{  //* Interactuando con HTML 
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("pills-tabContent")
    const product = document.querySelectorAll(".card-body")
    const pname = document.getElementsByTagName("h5")

    for (var i=0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('h5')[0];
        if (match){
            let textvalue = match.textContent || match.innerHTML
            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
            }else{
                product[i].style.display = "none";
            }
        } 
    }
}




const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = []; //* Arreglo carrito 

clickButton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem); // * Event Listener
});

function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };
  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
    //* Sweet Alert agregar a carrito
    swal("Exito", "Tu platillo a sido agregado al carrito", "success");
  


    const inputElemento = tbody.getElementsByClassName('input__elemento')
    for(let i=0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            carritoTotal()
            
            return null;

        }
    }
  carrito.push(newItem);
  renderCarrito();
}
function renderCarrito() {
  tbody.innerHTML = ''
  carrito.map((item) => {  //* metodo Array map
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.img} alt="">
        <h6 class="title">${item.title}</h6>
    </td>
        <td class="table__precio"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
        </td>
        
        `
        tr.innerHTML = Content;
        tbody.append(tr)
        tr.querySelector(".delete").addEventListener('click',removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change',sumaCantidad)
  });
  carritoTotal()
}

function carritoTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => { //* Metodo Array for Each
        const precio = Number(item.precio.replace("$",''))
        total = total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `total $${total}`
    addLocalStorage()

}
function removeItemCarrito(e){
    //* Sweet Alert
    swal("advertencia", "producto a sido retirado de su carrito", "warning");
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length; i++){

        if (carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1) //* Metodo Array Splice
        }
    }

   

    tr.remove()
    carritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => { //* Metodo Array for Each
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.vaule;
            item.cantidad = sumaInput.value;
            carritoTotal()
            
        }
    })

}
//* Local Storage
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload =  function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }

}
//* Funcion nueva contacto 
function sendEmail(){
    Email.send({
        SecureToken : "02434cf6-7583-403e-8ac0-75df6a3a3653",
        To : 'rafaelpenablesa@gmail.com',
        From : "qaguestuserspoton@gmail.com",
        Subject : "Nuevo contacto",
        Body : "name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> phone: " + document.getElementById("phone").value
        + "<br> Message: " + document.getElementById("message").value
    }).then(
      message => alert("su mensaje a sido enviado exitosamente")
    );
}
//* Funcion nueva Log-in Evento listener

const username =document.getElementById('username')
const password =document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }
    console.log(data)
})
//* Funcion Popup pagos
let popup = document.getElementById("popup"); 
function openPopup(){
   popup.classList.add("open-popup"); 
}   
function closePopup(){
    popup.classList.remove("open-popup"); 
}