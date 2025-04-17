import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
import { MenuCategory } from '../components/menuCategory'

export default async function menu() {
  const menuItems = await getAllMenuItems();
  const ingredients = await getAllIngredientsNoSizes();
  var sizes = await getAllSizes();
  return (
    <div className="p-6">
      <div className="space-y-4">
      <h1 className="text-4xl font-extrabold text-black text-center">Homepage</h1>
      <p>Quick orders section</p>
      <p>Free delivery on orders $25+ -- [go to menu hyperlink button]</p>
      </div>
    </div>
  );
}
