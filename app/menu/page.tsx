import { getAllMenuItems } from "../actions/getAllMenuItems"
import { getAllSizes } from "../actions/getAllSizes"
import { getAllIngredientsNoSizes } from "../actions/getAllIngredientsNoSizes"
import { MenuCategory } from "../components/menuCategory"
import { Pizza, Salad, Coffee } from "lucide-react"

//menu page for displaying all menu categories to the user
export default async function menu() {
  const menuItems = await getAllMenuItems()
  const ingredients = await getAllIngredientsNoSizes()
  var sizes = await getAllSizes()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto w-[90%] md:w-[80%] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Customize your perfect pizza or choose from our menu!</p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#pizza"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Pizza className="h-5 w-5" />
              <span>Pizza</span>
            </a>
            <a
              href="#salad"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Salad className="h-5 w-5" />
              <span>Salad</span>
            </a>
            <a
              href="#drink"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Coffee className="h-5 w-5" />
              <span>Drinks</span>
            </a>
          </div>
        </div>

        {/* Category sections with anchors */}
        <div className="space-y-16">
          {/* Pizza category */}
          <div id="pizza" className="scroll-mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-6 text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Pizza className="h-6 w-6" />
                  Pizza
                </span>
              </div>
            </div>
            <div className="mt-8">
              <MenuCategory menuItems={menuItems} ingredients={ingredients} sizes={sizes} category={"Pizza"} />
            </div>
          </div>

          {/* Salad category */}
          <div id="salad" className="scroll-mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-6 text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Salad className="h-6 w-6" />
                  Salad
                </span>
              </div>
            </div>
            <div className="mt-8">
              <MenuCategory menuItems={menuItems} ingredients={ingredients} sizes={sizes} category={"Salad"} />
            </div>
          </div>

          {/* Drink category */}
          <div id="drink" className="scroll-mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-6 text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Coffee className="h-6 w-6" />
                  Drinks
                </span>
              </div>
            </div>
            <div className="mt-8">
              <MenuCategory menuItems={menuItems} ingredients={ingredients} sizes={sizes} category={"Drink"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
