import { MenuItemServerComponent } from './NotCustomMenuItemServerComponent';
//a component very similar to the menuCategory component, but just for the quick orders
//section on the homepage. 
//menuItems will be filtered by QuickOrders, the parent of this component, to select the 
//menu items in the 'quick orders' section of the homepage
export function MenuCategoryQuick({menuItems, ingredients, sizes, category}) {
    //filter the quick orders by category if there is one
    //currently the category is pizza, but removing this would make any chosen menu items 
    //appear in the quick order section regardless of menu item category
    if (category) {
        var myMenuItems = menuItems.filter(item => item.category === category);
    }
    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {myMenuItems?.map((menuItem) => (
                    <div 
                    key={menuItem.menu_item_id} 
                    className="max-w-[100px]">
                    {/*like menuCategory, each item in myMenuItems is rendered as a MenuItemServerComponent component*/}
                    <MenuItemServerComponent menuItem={menuItem} ingredients={ingredients} sizes={sizes}/>
                    </div>
                ))}
            </div>
        </div>

    );
};