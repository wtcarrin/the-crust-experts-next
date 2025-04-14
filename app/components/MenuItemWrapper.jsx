import { CustomMenuItemServerComponent } from './CustomMenuItemServerComponent';
import { MenuItemServerComponent } from './NotCustomMenuItemServerComponent';

export function MenuItem({menuItem, ingredients, sizes}) {
  return (
    
    <MenuItemServerComponent menuItem={menuItem} ingredients={ingredients} sizes={sizes} />
  )
};

