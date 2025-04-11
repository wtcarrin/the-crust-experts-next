import { CustomMenuItemServerComponent } from '../components/CustomMenuItemServerComponent';
import { NotCustomMenuItemServerComponent } from '../components/NotCustomMenuItemServerComponent';

export function MenuItem({menuItem, ingredients, sizes}) {
  if (menuItem.customizable) {
    return (
      <CustomMenuItemServerComponent menuItem={menuItem} ingredients={ingredients} sizes={sizes}/>
    )
  }
  return (
    <NotCustomMenuItemServerComponent menuItem={menuItem} ingredients={ingredients} sizes={sizes} />
  )
};

