import { useCartContext } from "@/context/cartContext";
import { useThemeContext } from "@/context/themeContext";
import { useEffect, useMemo, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useSiteContext } from "@/context/siteContext";
import { frontendUrl, transalateText } from "@/utils/variables";
import { useLanguageContext } from "@/context/LanguageContext";
import Link from "next/link";

export default function Cart({ type, size, itemid, price, name, isSingle }) {
  const { cartItems, setCartItems } = useCartContext();
  const { siteTransalations } = useSiteContext();
  const { language } = useLanguageContext();
  const { themeLayout } = useThemeContext();
  const [quantity, setQuantity] = useState(1);
  const currentTheme = themeLayout?.toString().toLowerCase();
  const [showGotoCart, setShowGotoCart] = useState(false);

  useEffect(() => {
    if (isInCart) {
      setShowGotoCart(true);
    } else {
      setShowGotoCart(false);
    }
  }, [showGotoCart]);

  // Memoize safeCartItems to avoid unnecessary recalculations
  const safeCartItems = useMemo(
    () => (Array.isArray(cartItems) ? cartItems : []),
    [cartItems]
  );

  // Effect hook to sync quantity with cartItems
  useEffect(() => {
    const currentItem = safeCartItems.find((item) => item.id === itemid);
    if (currentItem) {
      setQuantity(currentItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [safeCartItems, itemid]);

  // Function to update cart in localStorage
  const updateCartInLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Check if item is in the cart
  const isInCart = safeCartItems.some((cartItem) => cartItem.id === itemid);

  // Function to handle cart action (Add/Remove)
  const handleCartAction = () => {
    if (isInCart) {
      // Remove item from cart
      const updatedCartItems = safeCartItems.filter(
        (cartItem) => cartItem.id !== itemid
      );
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    } else {
      // Add item to cart
      const newObject = { id: itemid, quantity: 1, price: price, name: name };
      const updatedCartItems = [...safeCartItems, newObject];
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    }
  };

  // Function to increase item quantity
  const CartPlus = () => {
    const updatedCartItems = safeCartItems.map((item) =>
      item.id === itemid
        ? { ...item, quantity: item.quantity + 1 } // Increase quantity
        : item
    );

    // If item does not exist, add it with quantity 1
    if (!updatedCartItems.some((item) => item.id === itemid)) {
      updatedCartItems.push({
        id: itemid,
        quantity: 1,
        price: price,
        name: name,
      });
    }

    setCartItems(updatedCartItems);
    updateCartInLocalStorage(updatedCartItems);

    // Update local quantity state
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease item quantity
  const CartMinus = () => {
    const itemInCart = safeCartItems.find((item) => item.id === itemid);

    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        // Update quantity if greater than 1
        const updatedCartItems = safeCartItems.map((item) =>
          item.id === itemid
            ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
            : item
        );
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        setQuantity((prevQuantity) => prevQuantity - 1);
      } else {
        // Remove item if quantity is 1
        const updatedCartItems = safeCartItems.filter(
          (item) => item.id !== itemid
        );
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        setQuantity(1);
      }
    }
  };

  // Determine button color based on theme
  let color;
  switch (currentTheme) {
    case "white":
      color = "white";
      break;
    case "chocolates":
      color = "#c89a3f";
      break;
    case "flowers":
      color = "#E62263";
      break;
    case "cakes":
      color = "#E79F02";
      break;
    case "events":
      color = "#258F89";
      break;
    default:
      color = "#c89a3f";
      break;
  }

  // Render cart button based on type
  let cartType;
  switch (type) {
    case "button":
      cartType = (
        <button
          onClick={handleCartAction}
          className={`btn-cart opacity-0 btn w-full absolute bottom-0 rounded-t-none border-none text-white hidden xl:flex`}
          style={{ background: color }}>
          {isInCart
            ? transalateText(
                siteTransalations?.generalTranslations?.remove,
                language
              )
            : transalateText(
                siteTransalations?.generalTranslations?.add,
                language
              )}
        </button>
      );
      break;

    case "button-small":
      cartType = (
        <button
          onClick={handleCartAction}
          className={`border-${currentTheme}-100 text-${currentTheme}-100 btn btn-outline w-auto border-gray-300 border border-solid rounded-[4px] hover:bg-white hover:border-gray-300 hover:text-black`}>
          <PlusIcon className={`text-${currentTheme}-100 size-4`} />
          {isInCart
            ? transalateText(
                siteTransalations?.generalTranslations?.remove,
                language
              )
            : transalateText(
                siteTransalations?.generalTranslations?.add,
                language
              )}
        </button>
      );
      break;

    default:
      cartType = (
        <>
          <div
            className={`${size} rounded-[6px] border border-solid border-black flex justify-between sm:max-w-[150px] sm:min-w-[150px] overflow-hidden`}>
            <button
              className="btn bg-transparent rounded-none border-none shadow-none  hover:bg-white min-h-[55px]"
              onClick={CartMinus}>
              <MinusIcon className="text-black size-5" />
            </button>
            <input
              type="number"
              value={quantity}
              className="border-none sm:w-full max-w-[50px] text-center !focus:border-none min-h-[55px]"
              readOnly
            />
            <button
              className="btn bg-transparent rounded-none border-none shadow-none  hover:bg-white min-h-[55px]"
              onClick={CartPlus}>
              <PlusIcon className="text-black size-5" />
            </button>
          </div>

          {showGotoCart && isSingle && isInCart && (
            <Link
              href={`${frontendUrl}/cart`}
              className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white">
              {transalateText(
                siteTransalations?.generalTranslations?.go_to_cart,
                language
              )}
            </Link>
          )}

          {!showGotoCart && isSingle && !isInCart && (
            <button
              onClick={(e) => {
                setShowGotoCart(true);
                handleCartAction(itemid ?? null, price ?? null, name ?? null);
              }}
              className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white">
              {transalateText(
                siteTransalations?.generalTranslations?.add_to_cart,
                language
              )}
            </button>
          )}
        </>
      );
      break;
  }

  return <>{cartType}</>;
}
