"use client";

import { useState, useEffect } from 'react';
import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';
import { getSumCostOfIngredients } from '../actions/getSumCostOfIngredients';
import { type } from 'os';
import { Trash2 } from 'lucide-react';
import { deleteItemFromCart } from '../actions/deleteItemFromCart';
import { updateItemInCart } from '../actions/updateItemInCart';
//newcartitem is the combination of customcartitem and noncustomcartitem
//so it's longer because it includes the ability to customize the cart item if it's customizable
//but it saves an if/else statement in the parent

//this is exactly the same way we fixed the exact same mistake as MenuItem.jsx
export function NewCartItem({ menuItem, sizes, cartItem, ingredients, mySize }) {
    //get sizes from the sizes passed in header
    //sizes are pre-filtered to be appropriately priced for the type of item
    const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
    const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
    const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");

    //usestate for opening/closing customize selected items window
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    //dictionary for storing specifically the size prices by S/M/L
    const sizePrices = {
        S: smallSize?.price || 0,
        M: mediumSize?.price || 0,
        L: largeSize?.price || 0
    }
    //initialize this data with information that may not be correct for custom items, but 
    //will be updated once the server queries have returned
    const [selectedIngredients, setSelectedIngredients] = useState(cartItem.ingredientIds);
    const [totalPrice, setTotalPrice] = useState(0);

    //like in the menuItem component, this seems redundant but we'll get an error if we don't initialize this with something
    const [selectedSize, setSelectedSize] = useState(mySize);
    

    useEffect(() => {
        updateItemInCart(cartItem.nonce, selectedIngredients)
    }, [selectedIngredients, selectedSize]);

    //when selectedSize or ingredients change, we'll use this to recalcualte the price of the item
    useEffect(() => {
      const calculatePrice = async () => {
          const baseIngredients = (selectedIngredients).filter(ingredient =>
              ingredient !== smallSize?.menu_item_id &&
              ingredient !== mediumSize?.menu_item_id &&
              ingredient !== largeSize?.menu_item_id
          );

          const basePrice = await clientGetSumCostOfIngredients(baseIngredients, ingredients);
          
          const newPrice = basePrice + sizePrices[selectedSize];
          setTotalPrice(newPrice);  
      };

      calculatePrice();
  }, [selectedSize, selectedIngredients]);

    //call updateItemInCart and close the popup window
    const updateItemInMyCart = (closePopup) => {
        console.log("SELECTED INGREDIENTS: ", selectedIngredients)
        updateItemInCart(cartItem.nonce, selectedIngredients)
        if(closePopup) {
            setIsPopupOpen(false)
        }
    }

    //update selctedingredients when one ingredient is removed/added
    const handleIngredientChange = (ingredient, isChecked) => {
      console.log("HANDLING INGREDIENT CHANGE")
      if (isChecked) {
          setSelectedIngredients(selectedIngredients => [...selectedIngredients, ingredient.menu_item_id]);
      }
      else {
          setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient.menu_item_id));
      }
    };

    //when size changes, add/remove the new and old sizes from selectedingredients
    const handleSizeChange = (size) => {
        setSelectedSize(size);

        const newIngredients = selectedIngredients.filter(ingredient =>
            ingredient !== smallSize?.menu_item_id &&
            ingredient !== mediumSize?.menu_item_id &&
            ingredient !== largeSize?.menu_item_id
        );

        let itemSize;
        switch (size) {
            case 'S':
                itemSize = smallSize;
                break;
            case 'M':
                itemSize = mediumSize;
                break;
            case 'L':
                itemSize = largeSize;
                break;
            default:
                itemSize = mediumSize;
        }

        if (itemSize) {
            setSelectedIngredients([...newIngredients, itemSize.menu_item_id]);
        } else {
            setSelectedIngredients(newIngredients);
        }
    };

    if (isPopupOpen) {
    {/*render the ingredient selection screen*/}
      return (
          <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="">
                  <div className="">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">Customize {menuItem.name}</h3>
                          {/*radio buttons for selecting size*/}
                          <div className={cartItem.nonce}>
                              <label className="">
                              <input 
                                  type="radio" 
                                  name={cartItem.nonce} 
                                  value="S" 
                                  checked={selectedSize === 'S'}
                                  onChange={() => handleSizeChange('S')}
                                  className="accent-primary"
                              />
                              <span>S</span>
                              </label>
                              <label className="flex items-center gap-1">
                              <input 
                                  type="radio" 
                                  name={cartItem.nonce} 
                                  value="M" 
                                  checked={selectedSize === 'M'}
                                  onChange={() => handleSizeChange('M')}
                                  className="accent-primary"
                              />
                              <span>M</span>
                              </label>
                              <label className="flex items-center gap-1">
                              <input 
                                  type="radio" 
                                  name={cartItem.nonce} 
                                  value="L" 
                                  checked={selectedSize === 'L'}
                                  onChange={() => handleSizeChange('L')}
                                  className="accent-primary"
                              />
                              <span>L</span>
                              </label>
                          </div>
                          {/*button for closing ingredient selection screen and discarding changes*/}
                          <button 
                              onClick={() => {
                                  setIsPopupOpen(false);
                              }}
                              className="text-gray-500 hover:text-gray-700"
                              type="button"
                          >
                              ✕
                          </button>
                      </div>
                      {/*form for selecting ingredients*/}
                      <form onSubmit={handleSubmit} className="space-y-4">
                          <p className="text-md font-medium">Select Ingredients:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/*map all ingredients to the select ingredients screen*/}
                              {ingredients
                                  ?.filter(ing => !["Small Size", "Medium Size", "Large Size"].includes(ing.name))
                                  ?.map((ingredient) => (
                                  <div key={ingredient.menu_item_id} className="border p-3 rounded-lg">
                                      <div className="flex items-start">
                                          <input
                                              type="checkbox"
                                              checked={selectedIngredients.some(ingredientId => ingredientId === ingredient.menu_item_id)}
                                              onChange={(e) => handleIngredientChange(ingredient, e.target.checked)}
                                              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                          />
                                          <div className="ml-2 block">
                                              <h2 className="text-lg font-semibold pr-6">{ingredient.name}</h2>
                                              <p className="text-sm text-gray-600">+${ingredient.price}</p>
                                              {ingredient.description && (
                                                  <p className="text-sm text-gray-600">{ingredient.description}</p>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          
                          <div className="pt-4 border-t">
                              <p className="font-semibold text-lg">
                                  Total: ${totalPrice.toFixed(2)}
                              </p>
                          </div>
                          
                          {/*submit button for updating the item and adding it to cart*/}
                          <button
                              type="submit"
                              onClick={() => updateItemInMyCart(true)}
                              className=""
                          >
                              Save
                          </button>
                      </form>
                  </div>
              </div>
          
              
          </div>
      );
  }
  else {
    {/*render the noncustomizable item.*/}
    return (
        <div className="border rounded-lg p-1 shadow-sm hover:shadow-md items-center justify-center transition-shadow duration-300 w-full max-w-xs mx-auto flex h-full">

        {/* Photo */}
        <div className="mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden" style={{ maxWidth: '80px', maxHeight: '80px' }}>
        {menuItem.photo_url ? (
          <img 
            src={menuItem.photo_url} 
            alt={menuItem.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-sm text-center">
            <span>No image</span>
          </div>
        )}
        </div>
        <div className="max-w-xs mx-auto flex flex-col items-center h-full">
        <h2 className="text-xl px-3 font-semibold mb-2 text-center">{menuItem.name}</h2>
        <p className="text-gray-600 mb-3 flex-grow">{menuItem.ingredients}</p>
        {/* S/M/L buttons */}
        <div className="flex justify-center items-center gap-4 py-2 mb-3">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`size-${cartItem.nonce}`}
              value="S"
              checked={selectedSize === 'S'}    
              onChange={() => handleSizeChange('S')}
              className="accent-primary"
            />
            <span>S</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`size-${cartItem.nonce}`}
              value="M"
              checked={selectedSize === 'M'}
              onChange={() => handleSizeChange('M')}
              className="accent-primary"
            />
            <span>M</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={`size-${cartItem.nonce}`}
              value="L"
              checked={selectedSize === 'L'}
              onChange={() => handleSizeChange('L')}
              className="accent-primary"
            />
            <span>L</span>
          </label>
        </div>
        </div>
        
        <div className="max-w-xs mx-auto flex flex-col h-full">
        <h2 className="text-xl font-bold mb-2 text-center">${totalPrice.toFixed(2)}</h2>
        {/* Submit form */}
        {menuItem.customizable ? (
            <button
                onClick={() => setIsPopupOpen(true)}
                className="text-green-600 hover:underline"
                aria-label="Customize item"
                type="button"
            >
                Start customizing!
            </button>
        ) : (
            <form onSubmit={handleSubmit} className="mt-auto ">
                <input type="hidden" name="menuItemId" value={menuItem.menu_item_id} />
                <input type="hidden" name="selectedIngredients" value={JSON.stringify(selectedIngredients)} />
                <input type="hidden" name="totalPrice" value={totalPrice.toFixed(2)} />
                <button
                    type="submit"
                    className="font-bold w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-lg transition-colors"
                    aria-label="Save"
                >
                    Add to cart
                </button>
            </form>
        )}
        </div>
        <div className="p-8">
        <form action={async () => {
                        deleteItemFromCart(cartItem.nonce);
                    }}>
                        
                        <button 
                            type="submit"
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Delete menu item"
                        >
                            <Trash2 size={18} />
                        </button>
                    </form>
        </div>
      </div>
    );
  }
}
