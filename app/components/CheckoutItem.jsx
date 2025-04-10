'use client'


export function CheckoutItem({menuItem, cartItem, cartItemPrice, ingredients, cartItemIDs}) {
  console.log("cartItem: ", cartItem);
  console.log("menuItem: ", menuItem);

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
    <div>
      <h1>{menuItem.name}</h1>
      <h2>{ingredientsString}</h2>
      <h2>{cartItemPrice}</h2>
    </div>
  )
};