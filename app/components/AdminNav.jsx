import Link from 'next/link';
export async function AdminNav() {
  
  return (
    <div className="flex items-center gap-4 p-4 black rounded-lg">
            <Link href="/adminDashboard" className="hover:text-blue-600">All Orders View</Link>
            <Link href="/changeMenu" className="hover:text-blue-600">Edit menu</Link>
            <Link href="/inventory" className="hover:text-blue-600">Inventory Tracking</Link>
    
          </div>
  );
}