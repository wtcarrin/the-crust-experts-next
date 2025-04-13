"use client";

import { useState, useEffect } from 'react';
import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';
import { type } from 'os';

export function NotCustomMenuItem({ menuItem, sizes, menuItemprice, addItemToCart, ingredients }) {
    const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
    const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
    const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");

    const sizePrices = {
        S: smallSize?.price || 0,
        M: mediumSize?.price || 0,
        L: largeSize?.price || 0
    }

    const [selectedIngredients, setSelectedIngredients] = useState(menuItem.ingredients);
    const [totalPrice, setTotalPrice] = useState(mediumSize.price);
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        handleSizeChange('M');
    }, []);

    useEffect(() => {
        const calculatePrice = async () => {
            const baseIngredients = menuItem.ingredients.filter(ingredient =>
                ingredient !== smallSize?.menu_item_id &&
                ingredient !== mediumSize?.menu_item_id &&
                ingredient !== largeSize?.menu_item_id
            );

            const basePrice = await clientGetSumCostOfIngredients(baseIngredients, ingredients);
            
            const newPrice = basePrice + sizePrices[selectedSize];
            setTotalPrice(newPrice);
            console.log("Calculated price:", basePrice, "+", sizePrices[selectedSize], "=", newPrice);
        };

        calculatePrice();
    }, [selectedSize]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addItemToCart(menuItem.menu_item_id, selectedIngredients);
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-xs mx-auto flex flex-col h-full">
  <h2 className="text-xl font-semibold mb-2 text-center">{menuItem.name}</h2>

  {/* Photo */}
  <div className="mb-4 h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
    {menuItem.photo_url ? (
      <img 
        src={menuItem.photo_url} 
        alt={menuItem.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="text-gray-400">
        <span>No image</span>
      </div>
    )}
  </div>

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

  <p className="text-gray-600 mb-3 flex-grow">{menuItem.ingredients}</p>
  <p className="text-lg font-bold mb-4">${totalPrice}</p>

  {/* Submit form */}
  <form onSubmit={handleSubmit} className="mt-auto">
    <input type="hidden" name="menuItemId" value={menuItem.menu_item_id} />
    <input type="hidden" name="selectedIngredients" value={JSON.stringify(selectedIngredients)} />
    <input type="hidden" name="totalPrice" value={totalPrice} />
    <button
      type="submit"
      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
      aria-label="Add to cart"
    >
      Add to cart
    </button>
  </form>
</div>
    );
}
