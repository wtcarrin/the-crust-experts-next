'use client'
//component for the checkout string that displays the list of ingredients in each menu item
//next to the menu item's name and price
export function CheckoutItem({menuItem, cartItem, cartItemPrice, ingredients, cartItemIDs}) {

  //build list of ingredients in the menu item
  var ingredientsString = ''
  for (const ingredient of ingredients) {
    if (cartItemIDs.includes(ingredient.menu_item_id)) {
      if (ingredientsString === '') {
        ingredientsString += ingredient.name
      }
      else {
        ingredientsString += ', ' + ingredient.name
      }
      }
    }

  return (
    //display checkoutitem information
    <div>
      <h1>{menuItem.name}</h1>
      <h2>{ingredientsString}</h2>
      <h2>{cartItemPrice}</h2>
    </div>
  )
};