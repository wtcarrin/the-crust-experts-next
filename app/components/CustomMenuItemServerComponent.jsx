import { CustomMenuItem } from './CustomMenuItem';
import { addItemToCart } from '../actions/addItemToCart';
import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';

export function CustomMenuItemServerComponent({ menuItem , ingredients, sizes}) {
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
    sizes = sizes.filter(size => size.category === "Pizza Ingredient");
  }
  else if (menuItem.category === "Salad") {
    var myIngredients = ingredients.filter(ingredient => ingredient.category === "Salad Ingredient");
    sizes = sizes.filter(size => size.category === "Salad Ingredient");
  }
  return <CustomMenuItem menuItem={menuItem} ingredients={myIngredients} menuItemPrice={menuItemPrice} sizes={sizes} addItemToCart={addItemToCart}/>;
}