import { MenuItem } from './MenuItem';
import { addItemToCart } from '../actions/addItemToCart';
//this component wraps menuitems and filters ingredients and sizes to be appropriate for the item type
//and also calculates the cost of ingredients of the default menu item before customer ingredient changes
export function MenuItemServerComponent({ menuItem , ingredients, sizes}) {
  //function to find the price of the menu item as it stands on the menu
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

  //filter the ingredients and sizes in the database to apply to the particular menu item by its type
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

  //finally return the menuitem with correct ingredients and sizes pertaining to its category
  return <MenuItem menuItem={menuItem} ingredients={myIngredients} menuItemPrice={menuItemPrice} sizes={mySizes} addItemToCart={addItemToCart} />;
}