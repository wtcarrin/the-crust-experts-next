import { Trash2 } from 'lucide-react'
import { deleteMenuItem } from '../actions/deleteMenuItem'
import { getAllMenuItems } from '../actions/getAllMenuItems';
//component for displaying all menu items to the admin changing the menu
export async function MenuItemGrid() {
  //get all menu items from the server
    const menuItems = await getAllMenuItems()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/*mape each menuitem*/}
      {menuItems?.map((menuItem) => (
        <div
          key={menuItem.menu_item_id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md relative"
        >
          {/*form to handle menu item deletion*/}
          <form
            action={async () => {
              'use server'
              await deleteMenuItem(menuItem.menu_item_id)
            }}
          >
            <button
              type="submit"
              className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </form>
          {/*display each menu item's information we got from the server*/}
          <h2 className="text-lg font-semibold pr-6">{menuItem.name}</h2>
          <p className="text-sm text-gray-600">ID: {menuItem.menu_item_id}</p>
          <p className="text-sm text-gray-600">Description: {menuItem.description}</p>
          <p className="text-sm text-gray-600">Price: {menuItem.price}</p>
          <p className="text-sm text-gray-600">Category: {menuItem.category}</p>
          <p className="text-sm text-gray-600">
            Customizable: {menuItem.customizable ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </div>
  )
}
