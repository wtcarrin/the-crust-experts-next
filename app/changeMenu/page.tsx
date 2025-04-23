import { AddMenuItemForm } from '../components/AddMenuItemForm';
import { MenuItemGrid } from '../components/MenuItemGrid';
import { AddIngredientForm } from '../components/AddIngredientForm';
import { IngredientGrid } from '../components/IngredientGrid';
import { AdminNav } from '../components/AdminNav';
//page to change aspects of the menu
//not just menu items, but the ingredients that make up menu items are changed on this page
  export default async function changeMenu() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Menu - Admin view</h1>
        {/*navigation bar specific to admin panel*/}
        <AdminNav/>
        {/*add/delete the menu items*/}
        <AddMenuItemForm/>
        <MenuItemGrid/>

        {/*add/delete ingredients*/}
        <AddIngredientForm/>
        <IngredientGrid/>
      </div>
    );  
  }