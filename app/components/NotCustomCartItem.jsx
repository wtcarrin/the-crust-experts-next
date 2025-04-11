"use client";

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { clientGetSumCostOfIngredients } from '../actions/clientGetSumCostOfIngredients';

export function NotCustomCartItem({menuItem, cartItem, cartItemPrice , ingredients, sizes, deleteItemFromCart, getSumCostOfIngredients, updateItemInCart}) {
    const [selectedIngredients, setSelectedIngredients] = useState(cartItem.ingredientIds);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState();
    const [selectedSize, setSelectedSize] = useState();

    const smallSize = sizes?.find(ingredient => ingredient.name === "Small Size");
    const mediumSize = sizes?.find(ingredient => ingredient.name === "Medium Size");
    const largeSize = sizes?.find(ingredient => ingredient.name === "Large Size");

    console.log(menuItem.name, "'s sizes are: ", sizes)

    const sizePrices = {
        S: smallSize?.price || 0,
        M: mediumSize?.price || 0,
        L: largeSize?.price || 0
    }

    console.log("Notcustomcartitem is rendering ", menuItem.name)

    useEffect(() => {
        cartItem.ingredientIds.forEach(ingredient => {
            if (ingredient === smallSize.menu_item_id) {
                handleSizeChange('S');
            } else if (ingredient === mediumSize.menu_item_id) {
                handleSizeChange('M');
            } else if (ingredient === largeSize.menu_item_id) {
                handleSizeChange('L');
            }
        });
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
            console.log(menuItem.name , " Calculated price:", basePrice, "+", sizePrices[selectedSize], "=", newPrice);
        };

        calculatePrice();
    }, [selectedSize]);

    const handleSizeChange = (size) => {
        setSelectedSize(size);

        const newIngredients = selectedIngredients.filter(ingredient =>
            ingredient !== smallSize.menu_item_id &&
            ingredient !== mediumSize.menu_item_id &&
            ingredient !== largeSize.menu_item_id
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
        if (selectedSize) {
            updateItemInCart(cartItem.nonce, [...newIngredients, itemSize.menu_item_id]);
        }
        
    };

    return (
        <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center justify-center">
                    {menuItem.photo_url ? (
                        <img 
                            src={menuItem.photo_url} 
                            alt={menuItem.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">No image</span>
                        </div>
                    )}
                </div>
                
                <div className="col-span-2">
                    <h2 className="text-lg font-semibold">{menuItem.name}</h2>
    
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name={`${cartItem.nonce}`}
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
                                name={`${cartItem.nonce}`}
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
                                name={`${cartItem.nonce}`}
                                value="L"
                                checked={selectedSize === 'L'}
                                onChange={() => handleSizeChange('L')}
                                className="accent-primary"
                            />
                            <span>L</span>
                        </label>
                    </div>
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
                    <p className="text-sm text-gray-600">{menuItem.description}</p>
                </div>
    
                <div>
                    <p className="font-medium">${totalPrice}</p>
                </div>
    
                <div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {menuItem.category}
                    </span>
                </div>
            </div>
        </div>
    );
}
