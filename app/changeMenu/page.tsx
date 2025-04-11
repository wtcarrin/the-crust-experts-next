  import { Trash2 } from 'lucide-react';

  //server functions
  import { addMenuItem } from '../actions/addMenuItem'
 
  import { AddMenuItemForm } from '../components/AddMenuItemForm';
  import { MenuItemGrid } from '../components/MenuItemGrid';
  import { AddIngredientForm } from '../components/AddIngredientForm';
  import { IngredientGrid } from '../components/IngredientGrid';
import { AdminNav } from '../components/AdminNav';

  export default async function changeMenu() {
    


    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Menu - Admin view</h1>
        <AdminNav/>
        {/* Manage menu items */}
        <AddMenuItemForm/>
        <MenuItemGrid/>

        {/* Manage ingredients */}
        <AddIngredientForm/>
        <IngredientGrid/>
      </div>
    );  
  }