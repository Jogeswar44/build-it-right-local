import type { MenuItem, Order } from "@/types";

export const mockMenuItems: MenuItem[] = [
  {
    id: "1", name: "Masala Dosa", description: "Crispy crepe with spiced potato filling, served with sambar & chutney",
    price: 60, category: "BREAKFAST", imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 45, lowStockThreshold: 10, rating: 4.5, reviewCount: 128,
  },
  {
    id: "2", name: "Chicken Biryani", description: "Fragrant basmati rice layered with tender chicken, spices & saffron",
    price: 120, category: "LUNCH", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    isVeg: false, isAvailable: true, stockQty: 30, lowStockThreshold: 10, rating: 4.8, reviewCount: 256,
  },
  {
    id: "3", name: "Paneer Butter Masala", description: "Rich tomato-cashew gravy with soft paneer cubes, served with naan",
    price: 100, category: "LUNCH", imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 25, lowStockThreshold: 10, rating: 4.6, reviewCount: 189,
  },
  {
    id: "4", name: "Cold Coffee", description: "Chilled coffee blended with milk, cream & a hint of chocolate",
    price: 45, category: "BEVERAGES", imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 60, lowStockThreshold: 15, rating: 4.3, reviewCount: 94,
  },
  {
    id: "5", name: "Veg Fried Rice", description: "Wok-tossed rice with fresh vegetables, soy sauce & spices",
    price: 80, category: "LUNCH", imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 35, lowStockThreshold: 10, rating: 4.2, reviewCount: 76,
  },
  {
    id: "6", name: "Samosa (2 pcs)", description: "Crispy pastry filled with spiced potatoes & peas, with mint chutney",
    price: 30, category: "SNACKS", imageUrl: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 50, lowStockThreshold: 15, rating: 4.4, reviewCount: 210,
  },
  {
    id: "7", name: "Egg Curry Rice", description: "Spicy boiled egg curry served with steamed basmati rice",
    price: 70, category: "LUNCH", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    isVeg: false, isAvailable: true, stockQty: 20, lowStockThreshold: 10, rating: 4.1, reviewCount: 63,
  },
  {
    id: "8", name: "Masala Chai", description: "Traditional Indian spiced tea with ginger, cardamom & cloves",
    price: 15, category: "BEVERAGES", imageUrl: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 100, lowStockThreshold: 20, rating: 4.7, reviewCount: 340,
  },
  {
    id: "9", name: "Vada Pav", description: "Mumbai-style spiced potato fritter in a bun with chutneys",
    price: 25, category: "SNACKS", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 8, lowStockThreshold: 10, rating: 4.5, reviewCount: 178,
  },
  {
    id: "10", name: "Chicken Roll", description: "Spiced grilled chicken wrapped in paratha with onions & sauces",
    price: 90, category: "SNACKS", imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
    isVeg: false, isAvailable: false, stockQty: 0, lowStockThreshold: 10, rating: 4.6, reviewCount: 145,
  },
  {
    id: "11", name: "Idli Sambar", description: "Soft steamed rice cakes with lentil sambar & coconut chutney",
    price: 40, category: "BREAKFAST", imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 40, lowStockThreshold: 10, rating: 4.3, reviewCount: 112,
  },
  {
    id: "12", name: "Mango Lassi", description: "Thick creamy yogurt drink blended with fresh mango pulp",
    price: 50, category: "BEVERAGES", imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
    isVeg: true, isAvailable: true, stockQty: 30, lowStockThreshold: 10, rating: 4.4, reviewCount: 87,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord-1", tokenNumber: "CNT-20260310-001", status: "PREPARING",
    items: [
      { menuItem: mockMenuItems[1], quantity: 1, specialNote: "Less spicy" },
      { menuItem: mockMenuItems[3], quantity: 2, specialNote: "" },
    ],
    subtotal: 210, tax: 10.5, total: 220.5, discountAmount: 0,
    createdAt: new Date(Date.now() - 12 * 60000), studentName: "Rahul Sharma",
  },
  {
    id: "ord-2", tokenNumber: "CNT-20260310-002", status: "PENDING",
    items: [
      { menuItem: mockMenuItems[0], quantity: 2, specialNote: "" },
      { menuItem: mockMenuItems[7], quantity: 1, specialNote: "" },
    ],
    subtotal: 135, tax: 6.75, total: 141.75, discountAmount: 0,
    createdAt: new Date(Date.now() - 5 * 60000), studentName: "Priya Patel",
  },
  {
    id: "ord-3", tokenNumber: "CNT-20260310-003", status: "READY",
    items: [
      { menuItem: mockMenuItems[2], quantity: 1, specialNote: "Extra butter" },
    ],
    subtotal: 100, tax: 5, total: 105, discountAmount: 0,
    createdAt: new Date(Date.now() - 20 * 60000), studentName: "Amit Kumar",
  },
  {
    id: "ord-4", tokenNumber: "CNT-20260310-004", status: "READY",
    items: [
      { menuItem: mockMenuItems[5], quantity: 3, specialNote: "" },
      { menuItem: mockMenuItems[7], quantity: 2, specialNote: "Extra ginger" },
    ],
    subtotal: 120, tax: 6, total: 126, discountAmount: 0,
    createdAt: new Date(Date.now() - 18 * 60000), studentName: "Sneha Reddy",
  },
  {
    id: "ord-5", tokenNumber: "CNT-20260310-005", status: "PENDING",
    items: [
      { menuItem: mockMenuItems[4], quantity: 1, specialNote: "" },
      { menuItem: mockMenuItems[6], quantity: 1, specialNote: "" },
    ],
    subtotal: 150, tax: 7.5, total: 157.5, discountAmount: 0,
    createdAt: new Date(Date.now() - 2 * 60000), studentName: "Vikram Singh",
  },
];
