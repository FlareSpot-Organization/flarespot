import React from "react";
import {
  AlertCircle,
  CreditCard,
  FileText,
  Package,
  RefreshCw,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SmartphoneIcon,
  Store,
  Truck,
  User,
} from "lucide-react";

export const getIconByName = (iconName: string): JSX.Element => {
  const icons: Record<string, JSX.Element> = {
    ShoppingBag: <ShoppingBag className="h-5 w-5 text-purple-600" />,
    Settings: <Settings className="h-5 w-5 text-purple-600" />,
    CreditCard: <CreditCard className="h-5 w-5 text-purple-600" />,
    AlertCircle: <AlertCircle className="h-5 w-5 text-purple-600" />,
    User: <User className="h-5 w-5 text-purple-600" />,
    ShieldCheck: <ShieldCheck className="h-5 w-5 text-purple-600" />,
    SmartphoneIcon: <SmartphoneIcon className="h-5 w-5 text-purple-600" />,
    Store: <Store className="h-5 w-5 text-purple-600" />,
    Package: <Package className="h-5 w-5 text-purple-600" />,
    RefreshCw: <RefreshCw className="h-5 w-5 text-purple-600" />,
    Truck: <Truck className="h-5 w-5 text-purple-600" />,
    FileText: <FileText className="h-5 w-5 text-purple-600" />,
  };

  return icons[iconName] || <AlertCircle className="h-5 w-5 text-purple-600" />;
};
