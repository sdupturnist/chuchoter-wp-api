// pages/_app.js

import "../../public/styles/globals.min.css";
import { ModalContextProvider } from "@/context/modalContext";
import { ThemeProvider } from "@/context/themeContext";
import { CartProvider } from "@/context/cartContext";
import { ProductProvider } from "@/context/productContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ModalContextProvider>
          <ProductProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </ProductProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
