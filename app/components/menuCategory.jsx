import { MenuItem } from '../components/MenuItem';

export function MenuCategory({menuItems, ingredients, sizes, category}) {
    const titleBlurbs = {
        Pizza: "Specialty Pizzas",
        Salad: "Fresh Salads",
    };
    const descriptionBlurbs = {
        Pizza: "Cooked to order in our wood-fired pizza oven",
        Salad: "Prepared with the freshest in-season produce",
    };

    if (category) {
        var myMenuItems = menuItems.filter(item => item.category === category);
    }
    return (
        <div className="space-y-4">
        
        <h2 className="text-3xl font-bold text-red-600">{titleBlurbs[category]}</h2>
        <p className="text-base text-black mb-8">{descriptionBlurbs[category]}</p>

        {myMenuItems?.map((menuItem) => (
        <div key={menuItem.menu_item_id}>
            <MenuItem menuItem={menuItem} ingredients={ingredients} sizes={sizes} />
        </div>
        ))}
        </div>
    );
};