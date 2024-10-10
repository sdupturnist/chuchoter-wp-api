// themes/themeContext.js
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {

  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productReviewCount, setProductReviewCount] = useState(0);
  

  return (
    <ProductContext.Provider value={{ productId, setProductId, productReviewCount, setProductReviewCount, productName, setProductName }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}