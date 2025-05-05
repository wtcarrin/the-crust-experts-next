import { QuickOrders } from "../components/QuickOrders"
import Link from "next/link"
import { Clock, MapPin, Phone, Star, ChevronRight, Pizza, Salad, Coffee } from "lucide-react"

//homepage
export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        ></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Authentic Italian Pizza</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Handcrafted with fresh ingredients and baked in our wood-fired oven
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/menu"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Orders Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Quick Orders</h2>
            <p className="text-gray-600">Our most popular items, ready to order</p>
          </div>
          <QuickOrders />
          <div className="text-center mt-8">
            <Link href="/menu" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
              View Full Menu <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1985, our family-owned restaurant has been serving authentic Italian cuisine for over 35 years.
              Our recipes have been passed down through generations, bringing the true taste of Italy to your table.
            </p>
            <p className="text-gray-600 mb-6">
              We source only the freshest ingredients, and our dough is made fresh daily. Our wood-fired oven, imported
              directly from Naples, gives our pizzas that perfect crispy-yet-chewy crust that we're known for.
            </p>
            <Link href="/menu" className="text-red-600 hover:text-red-700 font-medium inline-flex items-center">
              Order with Us <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Explore Our Menu</h2>
            <p className="text-gray-600">From classic favorites to signature specialties</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pizza Category */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Pizza className="h-20 w-20 text-red-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Specialty Pizzas</h3>
                <p className="text-gray-600 mb-4">Cooked to order in our wood-fired pizza oven</p>
                <Link
                  href="/menu#pizza"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                >
                  View Pizzas <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Salad Category */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Salad className="h-20 w-20 text-red-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Fresh Salads</h3>
                <p className="text-gray-600 mb-4">Prepared with the freshest in-season produce</p>
                <Link
                  href="/menu#salad"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                >
                  View Salads <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Drinks Category */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coffee className="h-20 w-20 text-red-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Drinks</h3>
                <p className="text-gray-600 mb-4">Premium Libations</p>
                <Link
                  href="/menu#drink"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                >
                  View Drinks <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The best pizza I've had outside of Italy! The crust is perfect and the ingredients are so fresh. This
                is now our family's go-to place for pizza night."
              </p>
              <div className="font-medium">- Sarah Johnson</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Not only is the food amazing, but the service is exceptional. The staff makes you feel like family
                every time you visit. Highly recommend the Margherita pizza!"
              </p>
              <div className="font-medium">- Michael Rodriguez</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I've been coming here for years and the quality has never wavered. Their commitment to authentic
                Italian recipes and fresh ingredients is unmatched in the area."
              </p>
              <div className="font-medium">- Jennifer Williams</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location and Hours */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-6">Visit Us</h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Location</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-600">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Hours</h3>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                <div className="text-gray-600">
                  <p className="mb-1">
                    <span className="font-medium">Monday - Thursday:</span> 11:00 AM - 10:00 PM
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Friday - Saturday:</span> 11:00 AM - 11:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Sunday:</span> 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-600">
                  (555) 123-4567
                  <br />
                  info@italianpizzeria.com
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-80 bg-gray-200">
            {/* This would be a map in a real implementation */}
            <div className="h-full w-full flex items-center justify-center">
              <MapPin className="h-16 w-16 text-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-red-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Authentic Italian Flavor?</h2>
          <p className="text-xl mb-8">Order online for pickup or delivery, or make a reservation for dine-in.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-white hover:bg-gray-100 text-red-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
