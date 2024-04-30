'use client'
import Link from 'next/link';
import {FaShoppingCart} from "react-icons/fa";

interface NavProps {
  tableNo: string;
}

const Navbar = ({tableNo}: NavProps) => {
    
  return (
    <nav className="bg-gray-800 py-4 lg:px-20 px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Restaurant Name */}
        <Link href="/">
          <span className="text-white text-2xl font-semibold">Restaurant App</span>
        </Link>

        {/* Cart and Table Number */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Link href={`/table/${tableNo}/cart`}>
            <span className="text-white">
              <FaShoppingCart className='h-6 w-6'/>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
