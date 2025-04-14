import { MenuItem } from './MenuItemWrapper';

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
        <div>
            <h2 className="text-3xl font-bold text-red-600">{titleBlurbs[category]}</h2>
            <p className="text-base text-black mb-8">{descriptionBlurbs[category]}</p>
            <div className="flex flex-wrap gap-4">
                {myMenuItems?.map((menuItem) => (
                    <div 
                    key={menuItem.menu_item_id} 
                    className="min-w-[300px] flex-1 basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.5rem)] flex">
                    <MenuItem menuItem={menuItem} ingredients={ingredients} sizes={sizes} className="flex-1"/>
                    </div>
                ))}
            </div>
        </div>

    );
};