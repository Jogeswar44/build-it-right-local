export type MenuCategory = "BREAKFAST" | "LUNCH" | "DINNER" | "BEVERAGES" | "SNACKS";
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COLLECTED" | "CANCELLED";
export type UserRole = "STUDENT" | "KITCHEN" | "ADMIN";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
  stockQty: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialNote: string;
}

export interface Order {
  id: string;
  tokenNumber: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discountCode?: string;
  discountAmount: number;
  createdAt: Date;
  studentName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  rollNumber?: string;
  department?: string;
  yearOfStudy?: number;
}
