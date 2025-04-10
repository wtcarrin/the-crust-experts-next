import { CustomMenuItemServerComponent } from '../components/CustomMenuItemServerComponent';
import { NotCustomMenuItemServerComponent } from '../components/NotCustomMenuItemServerComponent';

export function MenuItem({menuItem, ingredients}) {
  if (menuItem.customizable) {
    return (
      <CustomMenuItemServerComponent menuItem={menuItem} ingredients={ingredients} />
    )
  }
  return (
    <NotCustomMenuItemServerComponent menuItem={menuItem} />
  )
};

