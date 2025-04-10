'use client'

import { useState, useEffect } from 'react';

export function CustomMenuItem({ menuItem, ingredients, sizes, menuItemprice, addItemToCart, getSumCostOfIngredients }) {
    // Filter size options from ingredients
    const smallSize = sizes.find(ingredient => ingredient.name == "Small Size");
    const mediumSize = sizes.find(ingredient => ingredient.name == "Medium Size");
    const largeSize = sizes.find(ingredient => ingredient.name == "Large Size");

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState(menuItem.ingredients);
    const [totalPrice, setTotalPrice] = useState(menuItemprice);
    const [selectedSize, setSelectedSize] = useState();
    
    console.log("Type of selected ingredients: ", typeof selectedIngredients)
    console.log("Selected ingredients: ", selectedIngredients)

    // Set default size to medium if not selected
    useEffect(() => {
        handleSizeChange('M');
    }, [])

    // Update total price when selected ingredients or size changes
    useEffect(() => {
        setTotalPrice(getSumCostOfIngredients(selectedIngredients));
    }, [selectedIngredients]);

    const handleIngredientChange = (ingredient, isChecked) => {
        if (isChecked) {
            // Add ingredient if checked
            setSelectedIngredients(selectedIngredients => [...selectedIngredients, ingredient.menu_item_id]);
        }
        else {
            // Remove ingredient if unchecked
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient.menu_item_id));
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        
        // Remove previous size Size if exists
        const newIngredients = selectedIngredients.filter(ingredient => 
            ingredient !== smallSize.menu_item_id && ingredient !== mediumSize.menu_item_id && ingredient !== largeSize.menu_item_id
        );
        
        // Add new size Size
        let itemSize;
        switch(size) {
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
        setIsPopupOpen(false);
        setSelectedIngredients([]);
    };

    if (isPopupOpen) {
        return (
            <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Customize {menuItem.name}</h3>
                            <p className="text-md font-medium">Select Size:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label className="flex items-center gap-1">
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
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-md font-medium">Select Ingredients:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                    Total: ${totalPrice}
                                </p>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-4"
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
        return (
            <div className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold">{menuItem.name}</h2>
                        <p className="text-sm text-gray-600">{menuItem.description}</p>
                    </div>
                    <div>
                        <p className="font-medium">${menuItem.price}</p>
                    </div>
                    <div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {menuItem.category}
                        </span>
                    </div>
                    <div className="text-right">
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
                            <form action={addItemToCart}>
                                <input type="hidden" name="menuItemId" value={menuItem.menu_item_id} />
                                <input type="hidden" name="selectedIngredients" value="[]" />
                                <input type="hidden" name="totalPrice" value={menuItem.price} />
                                <button
                                    type="submit"
                                    className="text-green-600 hover:underline"
                                    aria-label="Add to cart"
                                >
                                    Add to cart
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}