import { CustomMenuItemServerComponent } from '../components/CustomMenuItemServerComponent';
import { NotCustomMenuItemServerComponent } from '../components/NotCustomMenuItemServerComponent';

export function MenuItem({menuItem}) {
  if (menuItem.customizable) {
    return (
      <CustomMenuItemServerComponent menuItem={menuItem} />
    )
  }
  return (
    <NotCustomMenuItemServerComponent menuItem={menuItem} />
  )
};

