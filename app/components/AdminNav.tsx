'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const AdminNav = () => {

    const router = useRouter();

    const logout = () => {
        axios.get("/api/logout").then(res=> {
            console.log(res.data);
            router.push("/login");
        })
    }
    
  return (
    <nav className="bg-gray-800 py-4 px-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Restaurant Name */}
        <Link href="/admin">
          <span className="text-white text-2xl font-semibold">Restaurant App</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href={`/admin/orders`}>
            <span className="text-white text-lg">Orders</span>
          </Link>
          <Link href={`/admin/inventory`}>
            <span className="text-white text-lg">Inventory</span>
          </Link>
          <button className='text-red-300' onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
