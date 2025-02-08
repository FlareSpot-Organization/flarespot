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
  skuAttr: string;
  propMap: string;
  price: number | string;
  promotionPrice: number | string;
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
  };
}
