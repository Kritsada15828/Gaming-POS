import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onViewImage: (image: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onViewImage }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-blue-500 cursor-pointer overflow-hidden"
      onClick={() => onAdd(product)}
    >
      <div className="h-40 overflow-hidden relative bg-gray-100">
        <img 
          src={imageError ? `https://picsum.photos/seed/${product.id}/200/200` : product.image} 
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onClick={(e) => {
             e.stopPropagation();
             onViewImage(imageError ? `https://picsum.photos/seed/${product.id}/400/400` : product.image);
          }}
        />
        {/* Zoom Icon for Lightbox */}
        <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Tooltip container */}
        <div className="relative mb-2">
            <h5 className="font-bold text-gray-800 text-lg line-clamp-2">{product.name}</h5>
            
            {/* Custom Tooltip implementation similar to the CSS provided */}
            {product.description && (
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                 {product.description}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
               </div>
            )}
        </div>
        
        <div className="mt-auto pt-2">
           <p className="text-blue-600 font-bold text-xl">{product.price.toLocaleString()} บาท</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;