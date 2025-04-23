import { getAllMenuItems } from '../actions/getAllMenuItems';
import { getAllSizes } from '../actions/getAllSizes';
import { getAllIngredientsNoSizes } from '../actions/getAllIngredientsNoSizes';
import { QuickOrders } from '../components/QuickOrders'

//homepage 
export default async function menu() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {/*we just render the quickorders section for now, this may change*/}
      <QuickOrders/>
      </div>
    </div>
  );
}
