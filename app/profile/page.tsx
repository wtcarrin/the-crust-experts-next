import { ProfileServerComponent } from "../components/ProfileServerComponent"

//profile page, everything is handled by the profileservercomponent
export default async function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        <ProfileServerComponent />
      </div>
    </div>
  )
}
