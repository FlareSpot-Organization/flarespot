// authType
export type initialProductStateProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  products: [];
  categories: [];
  singleProduct: {};
  reviews: [];
  deals: [];
  searchResults: [];
  bestSellers: [];
};

export interface SkuValue {
  vid?: number | string | undefined;
  name: string;
  propTips: string;
  image?: string; // Making image optional since it might not exist on all objects
}

export interface SkuProp {
  pid: number;
  name: string;
  values: SkuValue[];
}

export interface Sku {
  skuId: string;
  propMap: string;
  price: number | string;
  promotionPrice: number | string | null;
  quantity: number;
  ext: string;
}

export interface ProductCardProps {
  item: {
    itemId: number;
    title: string;
    image: string;
    sku: {
      def: {
        price: string;
        promotionPrice: string;
      };
    };
  };
}

export interface CartItem {
  quantity: number;
  itemId: number;
  title: string;
  image: string;
  sku: {
    def: {
      price: string;
      promotionPrice: string;
    };
    props: {
      name: string;
      pid: number;
      values: {
        vid: number;
        name: string;
      }[];
    }[];
  };
  selectedSku?: {
    promotionPrice: string;
    skuId: string;
  };
  selectedProperties?: {
    [key: string]: {
      pid: number;
      vid: number;
    };
  };
}

export interface WishListItem {
  itemId: number;
  title: string;
  image: string;
  sku: {
    def: {
      price: string;
      promotionPrice: string;
    };
  };
}

export interface SkuCartAttribute {
  pid: number;
  vid: number;
}

export interface SkuCartAttributes {
  [attributeName: string]: SkuCartAttribute;
}

export interface SkuCartPropertyValue {
  vid: number;
  name: string;
  image?: string;
}

export interface SkuCartProperty {
  pid: number;
  name: string;
  values: SkuCartPropertyValue[];
}

export interface ExtractedSkuCartValues {
  [key: string]: string | null;
}
