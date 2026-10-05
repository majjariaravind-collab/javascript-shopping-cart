const products=[
  {id:'p01',name:'Ice Cream',priceCents:3},
  {id:'p02',name:'StrawBerry',priceCents:10},
  {id:'p03',name:'Vanilla',priceCents:20}
];
let cart=JSON.parse(localStorage.getItem('cart'))||[];
function addCart(productId){
  const cartItem=cart.find((cartItem)=>{
    return cartItem.id===productId;
  });
  if(cartItem){
    cartItem.quantity+=1;
  }else{
    const productDetails= products.find((product)=>{
      return product.id===productId;
      });
      cart.push(
        {
          id:productDetails.id,
          name:productDetails.name,
          priceCents:productDetails.priceCents,
          quantity:1
      });
  }
  saveToLocalStorage()
  displayProducts();
}

function saveToLocalStorage(){
localStorage.setItem('cart',JSON.stringify(cart));

}

function increaseButton(productId){
 const increaseQuantity= cart.find((product)=>{
  return product.id===productId;
  });
  increaseQuantity.quantity+=1;
 saveToLocalStorage()
  displayProducts();
}

function deleteButton(productId){
  cart=cart.filter((cartItem)=>{
    return cartItem.id !== productId;
  });
  saveToLocalStorage()
  displayProducts();
}

function decreaseButton(productId){
  const decreaseQuantity= cart.find((product)=>{
  return product.id===productId;
  });
  decreaseQuantity.quantity-=1;
  if(decreaseQuantity.quantity===0){
    deleteButton(productId);
    return;
  }
 saveToLocalStorage()
  displayProducts();
}

function displayProducts(){
  let cartItemHTML="";
  cart.forEach((cartItem)=>{
    cartItemHTML+=`
    <div>
    <h3>Id:${cartItem.id}</h3>
    <h3>Name:${cartItem.name}</h3>
    <p>PriceCents:$${cartItem.priceCents}</p>
    <p>Quantity:${cartItem.quantity}</p>
    <button class='deleteButton' onClick="deleteButton('${cartItem.id}')">Delete</button>
    <button class='increaseButton' onClick="increaseButton('${cartItem.id}')">+</button>
    <button class='deleteButton' onClick="decreaseButton('${cartItem.id}')">-</button>
    </div>
    `;
  });
  document.querySelector(".cartItems").innerHTML=cartItemHTML;
}
displayProducts();