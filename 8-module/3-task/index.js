export default class Cart {
  cartItems = [];// [product: {...}, count: N]
  cartItemsProductName = [];
  
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }
		
    let cartProductName = product.name;
    let count = 1;
    

    if (!this.cartItemsProductName.includes(cartProductName)) {
      this.cartItemsProductName.push(cartProductName);
      
      this.cartItems.push({
        product,
        count: 1
      })
    } else {
      console.log(this.cartItems)
      for (let i = 0; i < this.cartItemsProductName.length; i++) {
        if (cartProductName == this.cartItemsProductName[i]) {
          this.cartItems[i].count += 1;
          count = this.cartItems[i].count
          break;
        }
      }

    }
    
    let cartItem = {
      product,
      count
    }
		this.onProductUpdate(cartItem)
  }  

  updateProductCount(productId, amount) {
    let index = 0;
     let cartItem = this.cartItems.find( (cartItem, ndx) => {
       index = ndx;
       return cartItem.product.id == productId;
     })
     switch (amount) {
       case 1: 
         cartItem.count++
         break;
       case -1: 
         cartItem.count--
     }
     if (cartItem.count == 0) {
       this.cartItems.splice(index, 1);
       this.cartItemsProductName.splice(index, 1)
     }
     this.onProductUpdate(cartItem)
   }

   isEmpty() {
    if (this.cartItems.length == 0) {
      return true;
    }
    return false;
  }

  getTotalCount() {
    let sum = 0;
    this.cartItems.forEach( (cart) => {
      sum += cart.count;
    })
    return sum;
  } 

  getTotalPrice() {
    let sum = 0;
    this.cartItems.forEach( (cart) => {
      sum += cart.product.price * cart.count;
    })
    return sum;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

