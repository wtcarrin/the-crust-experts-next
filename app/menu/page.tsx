import { getAllMenuItems } from '../actions/getAllMenuItems';
import { MenuItem } from '../components/MenuItem';

export default async function menu() {
  const menuItems = await getAllMenuItems();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu - Customer view</h1>

      {/* Full-width table/list layout */}
      <div className="space-y-4">
        {menuItems?.map((menuItem) => (
          <div key={menuItem.menu_item_id}>
            <MenuItem menuItem={menuItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
