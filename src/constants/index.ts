import { IconIProps } from "../types/common";

export const TABS = {
  home: "Home",
  mail: "Mail",
  live: "Live",
  notify: "Thông báo",
  personal: "Tôi",
};
export const COLORS = {
  primary: "#ee4d2d",
  secondary: "#c0c2f4",
  text: "#222",
  white: "#fff",
  yellow: "#ffd424e6",
  green: "#26aa99",
  gray: "#e8e8e8",
  grayDark: "#929292",
};

export const FONTS = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};
export const ICON_MESSAGE: IconIProps = {
  name: "message1",
  type: "antdesign",
};

export const ROUTES = {
  ...TABS,
  main: "Main",
  product: "Product",
  cart: "Cart",
  category: "Category",
  search: "Search",
  searchResult: "SearchResult",

  message: "Messenger",
  personal: "Personal",
};
export const ICON_HOME = (active: boolean): IconIProps => ({
  name: active ? "home" : "home-outline",
  type: "ionicon",
});

export const ICON_CART: IconIProps = {
  name: "shoppingcart",
  type: "antdesign",
};

export const ICON_SEARCH: IconIProps = {
  name: "search1",
  type: "antdesign",
};

export const API_URL = "https://shopee-mobile-app-clone-server.onrender.com";
