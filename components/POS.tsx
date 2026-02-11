import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Product, CartItem, INITIAL_PRODUCTS } from '../types';
import ProductCard from './ProductCard';

const POS: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore "cafe" collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cafe"));
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
        });

        // Use fetched products if available, otherwise use initial mock data for demo
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      } catch (error) {
        console.error("Error fetching products, using backup data:", error);
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
        return prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        });
    });
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleLogout = () => signOut(auth);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      
      {/* LEFT SIDE: PRODUCTS */}
      <div className="w-full md:w-2/3 h-full flex flex-col border-r border-gray-200">
        
        {/* Header / Nav */}
        <div className="p-4 bg-white shadow-sm flex justify-between items-center shrink-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">โซนเลือกสินค้า</h1>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 underline">
            ออกจากระบบ
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 shrink-0 bg-white border-b border-gray-200">
           <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="ค้นหาสินค้า (ชื่อสินค้า)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
           {loading ? (
             <div className="flex justify-center items-center h-full">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
             </div>
           ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAdd={addToCart}
                        onViewImage={setLightboxImage}
                    />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        ไม่พบสินค้าที่ค้นหา
                    </div>
                )}
            </div>
           )}
        </div>
      </div>

      {/* RIGHT SIDE: CART */}
      <div className="w-full md:w-1/3 bg-white h-full flex flex-col shadow-xl z-20">
        <div className="p-4 bg-gray-800 text-white shadow-md shrink-0">
            <h1 className="text-xl font-bold">โซนจ่ายเงิน</h1>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-0">
            {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <p>ยังไม่มีรายการสินค้า</p>
                </div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase sticky top-0">
                        <tr>
                            <th className="px-4 py-3">รายการ</th>
                            <th className="px-4 py-3 text-center">จำนวน</th>
                            <th className="px-4 py-3 text-right">ราคา</th>
                            <th className="w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cart.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.price} / หน่วย</div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="inline-flex items-center border rounded-md">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-200 text-gray-600">-</button>
                                        <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-200 text-gray-600">+</button>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right font-medium">
                                    {(item.price * item.quantity).toLocaleString()}
                                </td>
                                <td className="px-1 text-center">
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 shrink-0">
            <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex justify-between items-end">
                    <h4 className="text-lg text-gray-600 font-medium">ยอดรวมสุทธิ</h4>
                    <h3 className="text-3xl font-bold text-red-600">{totalAmount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</h3>
                </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
                <button 
                    disabled={cart.length === 0}
                    className="col-span-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    พักบิล
                </button>
                <button 
                    onClick={clearCart}
                    disabled={cart.length === 0}
                    className="col-span-1 py-3 px-4 bg-white border border-red-500 text-red-600 hover:bg-red-50 font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ยกเลิก
                </button>
                <button 
                    disabled={cart.length === 0}
                    className="col-span-2 py-4 px-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-lg shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    onClick={() => alert(`ชำระเงินเรียบร้อย! ยอดเงิน: ${totalAmount.toLocaleString()} บาท`)}
                >
                    ชำระเงิน (Charge)
                </button>
            </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300">&times;</button>
          <img 
            src={lightboxImage} 
            alt="Enlarged product" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default POS;