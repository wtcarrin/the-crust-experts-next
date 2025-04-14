import { MenuItem } from './MenuItem';
import { addItemToCart } from '../actions/addItemToCart';

export function MenuItemServerComponent({ menuItem , ingredients, sizes}) {
  function getSumCostOfIngredients(cartItemIDs) {  
    const allIngredients = ingredients
    var subTotal = 0
    for (var itemId of cartItemIDs) {
      if(!allIngredients) return;
      const ingredient = allIngredients.find(item => item.menu_item_id === Number(itemId));
      if(!ingredient) {
        console.log("Can't find ingredient with id: " + itemId)
        console.log("Type of ingredient: " + typeof ingredient)
        console.log("Type of itemId: " + typeof itemId)
      }
      subTotal += ingredient?.price ?? 0;
    }
    return subTotal;
  }
  var menuItemIDs = menuItem.ingredients
  var menuItemPrice = getSumCostOfIngredients(menuItemIDs)
  if (menuItem.category === "Pizza") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Pizza Ingredient");
    var mySizes = sizes.filter(size => size.category === "Pizza Ingredient");
  }
  else if (menuItem.category === "Salad") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
    var mySizes = sizes.filter(size => size.category === "Salad Ingredient");
  }
  else if (menuItem.category === "Drink") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Drink Ingredient");
    var mySizes = sizes.filter(size => size.category === "Drink Ingredient");
  }
  return <MenuItem menuItem={menuItem} ingredients={myIngredients} menuItemPrice={menuItemPrice} sizes={mySizes} addItemToCart={addItemToCart} />;
}