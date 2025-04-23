"use client";

import { useState, useEffect } from 'react';
import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';
//component to render menuitems on the menu page
//this component can handle both custom and non-custom menu items...
//most of the complexity comes from custom menu items, since we need to keep track
//of their ingredients whenever the customer alters them.
export function MenuItem({ menuItem, sizes, menuItemprice, addItemToCart, ingredients }) {
    //get the sizes by name from the sizes argument passed
    //sizes will be filtered already to be specific to the type of item this menu item is
    const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
    const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
    const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");

    //usestate for tracking if the customer is currently customizing the selected ingredients
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    //dictionary for storing the prices by S/M/L, the values used later and also clientside
    const sizePrices = {
        S: smallSize?.price || 0,
        M: mediumSize?.price || 0,
        L: largeSize?.price || 0
    }

    //start selectedIngredients data off with the default ingredients on the menuitem, if any
    const [selectedIngredients, setSelectedIngredients] = useState(menuItem.ingredients);
    
    //start with totalPrice set at the cost of the medium sized item
    const [totalPrice, setTotalPrice] = useState(mediumSize.price);

    //initially render the item with medium size selected as default
    //seems redundant, but we get an error if we don't initialize this value
    const [selectedSize, setSelectedSize] = useState('M');

    //handlesizechange will update selectedingredients for us
    useEffect(() => {
        handleSizeChange('M');
    }, []);

    //on selectedSize or ingredients change, we'll recalculate the price using ***CLIENT SIDE***
    //ingredient cost calulation this is so much faster than before omg
    useEffect(() => {
      const calculatePrice = async () => {
          const baseIngredients = (selectedIngredients).filter(ingredient =>
              ingredient !== smallSize?.menu_item_id &&
              ingredient !== mediumSize?.menu_item_id &&
              ingredient !== largeSize?.menu_item_id
          );

          const basePrice = await clientGetSumCostOfIngredients(baseIngredients, ingredients);
          
          const newPrice = basePrice + sizePrices[selectedSize];
          console.log("basePrice: ", basePrice, "\tnewPrice: ", newPrice)
          setTotalPrice(newPrice);
      };

      calculatePrice();
  }, [selectedSize, selectedIngredients]);


    //function to handle ingredients changing by adding/removing single ingredient
    const handleIngredientChange = (ingredient, isChecked) => {
      if (isChecked) {
          // Add ingredient if checked
          setSelectedIngredients(selectedIngredients => [...selectedIngredients, ingredient.menu_item_id]);
          console.log("adding ", ingredient.name, " to custom item.")
      }
      else {
          // Remove ingredient if unchecked
          setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient.menu_item_id));
      }
  };

    //function to handle changing size
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
            //include this new size in selectedingredients
            setSelectedIngredients([...newIngredients, itemSize.menu_item_id]);
        } else {
            setSelectedIngredients(newIngredients);
        }
    };

    //when we submit, add item to cart and then close the popup and set selectedingredients to be empty
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addItemToCart(menuItem.menu_item_id, selectedIngredients);
        if(menuItem.customizable) {
          setIsPopupOpen(false);
          setSelectedIngredients([]);
        }
    };

    if (isPopupOpen) {
    {/*rendering the popup window for selecting ingredients
        should only happen on customizable menuitems*/}
      return (
          <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="">
                  <div className="">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">Customize {menuItem.name}</h3>
                          {/*radio buttons to select sizes, each one calling handleSizeChange*/}
                          <div className="">
                              <label className="">
                              <input 
                                  type="radio" 
                                  name="size" 
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
                                  name="size" 
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
                                  name="size" 
                                  value="L" 
                                  checked={selectedSize === 'L'}
                                  onChange={() => handleSizeChange('L')}
                                  className="accent-primary"
                              />
                              <span>L</span>
                              </label>
                          </div>
                          {/*button to close the popup window without saving changes*/}
                          <button 
                              onClick={() => {
                                  setIsPopupOpen(false);
                                  setSelectedIngredients([]);
                              }}
                              className="text-gray-500 hover:text-gray-700"
                              type="button"
                          >
                              ✕
                          </button>
                      </div>
                      {/*form for selecting ingredients to add to the menuitem*/}
                      <form onSubmit={handleSubmit} className="space-y-4">
                          <p className="text-md font-medium">Select Ingredients:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/*map all ingredients*/}
                              {ingredients
                                  ?.filter(ing => !["Small Size", "Medium Size", "Large Size"].includes(ing.name))
                                  ?.map((ingredient) => (
                                  <div key={ingredient.menu_item_id} className="border p-3 rounded-lg">
                                      <div className="flex items-start">
                                        {/*checkbox for selecting/deselcting ingredient, calls handleIngredientChange*/}
                                          <input
                                              type="checkbox"
                                              checked={selectedIngredients.some(ingredientId => ingredientId === ingredient.menu_item_id)}
                                              onChange={(e) => handleIngredientChange(ingredient, e.target.checked)}
                                              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                          />
                                          {/*display ingredient data*/}
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
                                {/*the only place that totalPrice is used on this page after all that*/}
                                  Total: ${totalPrice.toFixed(2)}
                              </p>
                          </div>
                          
                          {/*button for adding custom menu item to cart as-is*/}
                          <button
                              type="submit"
                              className=""
                          >
                              Add to Cart
                          </button>
                      </form>
                  </div>
              </div>
          
              
          </div>
      );
  }
  else {
    {/*a simpler menuitem, rendered when it's noncustomizable*/}
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
              name={`size-${menuItem.menu_item_id}`}
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
              name={`size-${menuItem.menu_item_id}`}
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
              name={`size-${menuItem.menu_item_id}`}
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
                {/*Add item to cart*/}
                <button
                    type="submit"
                    className="font-bold w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-lg transition-colors"
                    aria-label="Add to cart"
                >
                    Add to cart
                </button>
            </form>
        )}
        </div>
      </div>
    );
  }
}
