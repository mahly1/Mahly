export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  iconType: 'sugar' | 'chips' | 'eggs' | 'oil' | 'general';
  price?: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'rejected' | 'delivered';
  timestamp: string;
  totalAmount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  packageSize?: string; // For B2B
}

export interface Notification {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'order' | 'system';
  isRead: boolean;
  orderId?: string;
}

export type UserRole = 'MERCHANT' | 'CONSUMER';

export interface UserProfile {
  name: string;
  phone: string;
  password?: string;
  role: UserRole;
  // Merchant specific
  shopName?: string;
  address?: string;
  age?: string;
  workerCount?: string;
  shopImage?: string;
}
