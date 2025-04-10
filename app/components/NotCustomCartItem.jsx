"use client";

import { useState, useEffect } from 'react';

export function NotCustomCartItem({menuItem, cartItem, cartItemPrice, ingredients, sizes, addItemToCart, getSumCostOfIngredients, updateItemInCart}) {
    const [selectedIngredients, setSelectedIngredients] = useState(cartItem.ingredientIds);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(cartItemPrice);
    const [selectedSize, setSelectedSize] = useState();

    const smallSize = sizes.find(ingredient => ingredient.name === "Small Size");
    const mediumSize = sizes.find(ingredient => ingredient.name === "Medium Size");
    const largeSize = sizes.find(ingredient => ingredient.name === "Large Size");

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
        console.log("Type of selected ingredients: ", typeof selectedIngredients);
        setTotalPrice(getSumCostOfIngredients(selectedIngredients));
    }, [selectedIngredients]);

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

        updateItemInCart(cartItem.nonce, [...newIngredients, itemSize.menu_item_id]);
    };

    return (
        <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-5 gap-4 items-center">
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
