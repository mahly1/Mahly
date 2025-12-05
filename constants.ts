import { Product, Notification, Order } from './types';

export const APP_COLORS = {
  primary: '#15803d', // green-700
  secondary: '#166534', // green-800
  accent: '#dcfce7', // green-100
  bg: '#f9fafb', // gray-50
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'طلب جديد من محمود',
    subtitle: '3 أكياس سكر و زجاجة زيت واحدة',
    time: 'منذ 15 دقيقة',
    type: 'order',
    isRead: false,
    orderId: 'ord-001'
  },
  {
    id: '2',
    title: 'طلب أحمد',
    subtitle: '3 أكياس شيبسي و زجاجة بيبسي',
    time: 'منذ ساعة واحدة',
    type: 'order',
    isRead: false,
    orderId: 'ord-002'
  },
  {
    id: '3',
    title: 'طلب حنان',
    subtitle: 'كيسين أرز و علبة ملح صغيرة',
    time: 'منذ ساعتين',
    type: 'order',
    isRead: true,
    orderId: 'ord-003'
  },
  {
    id: '4',
    title: 'طلب إبراهيم',
    subtitle: '4 أكياس إندومي و برطمان صلصة صغير',
    time: 'منذ 3 ساعات',
    type: 'order',
    isRead: true,
    orderId: 'ord-004'
  }
];

export const MOCK_ORDERS: Record<string, Order> = {
  'ord-001': {
    id: 'ord-001',
    customerName: 'محمود',
    customerAddress: 'شارع 9، المعادي، القاهرة',
    status: 'pending',
    timestamp: '2023-10-27T10:00:00',
    items: [
      { id: 'i1', name: 'أكياس مقرمشات', quantity: 3, unit: '', iconType: 'chips' },
      { id: 'i2', name: 'كيس سكر', quantity: 1, unit: '', iconType: 'sugar' },
      { id: 'i3', name: 'بيضات', quantity: 3, unit: '', iconType: 'eggs' },
    ]
  }
};

export const B2B_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'كرتونة سكر',
    description: '(10 كجم)',
    price: 240,
    category: 'dry',
    packageSize: '10x1kg'
  },
  {
    id: 'p2',
    name: 'كرتونة زيت',
    description: '(12 زجاجة)',
    price: 450,
    category: 'oil',
    packageSize: '12x700ml'
  },
  {
    id: 'p3',
    name: 'شيكارة أرز',
    description: '(25 كجم)',
    price: 700,
    category: 'dry',
    packageSize: '25kg'
  },
  {
    id: 'p4',
    name: 'بالتة ملح (20 كيس)',
    description: '',
    price: 180,
    category: 'spices',
    packageSize: '20x300g'
  },
  {
    id: 'p5',
    name: 'كرتونة شيبسي',
    description: '(24 كيس)',
    price: 320,
    category: 'snacks',
    packageSize: '24xPack'
  },
  {
    id: 'p6',
    name: 'صندوق بيبسي',
    description: '(6 زجاجات)',
    price: 110,
    category: 'drinks',
    packageSize: '6x1L'
  }
];

export const CONSUMER_PRODUCTS: Product[] = [
  { id: 'c1', name: 'كيس سكر', description: '1 كيلو', price: 25, category: 'dry' },
  { id: 'c2', name: 'زجاجة زيت', description: '700 مل', price: 40, category: 'oil' },
  { id: 'c3', name: 'كيس شيبسي', description: 'حجم عائلي', price: 15, category: 'snacks' },
  { id: 'c4', name: 'زجاجة بيبسي', description: '1 لتر', price: 20, category: 'drinks' },
  { id: 'c5', name: 'طبق بيض', description: '30 بيضة', price: 130, category: 'fresh' },
  { id: 'c6', name: 'كيس مكرونة', description: '400 جم', price: 12, category: 'dry' },
];

export const CHART_DATA = [
  { name: 'Sun', sales: 200, expenses: 100 },
  { name: 'Mon', sales: 400, expenses: 250 },
  { name: 'Tue', sales: 300, expenses: 200 },
  { name: 'Wed', sales: 600, expenses: 400 },
  { name: 'Thu', sales: 500, expenses: 300 },
  { name: 'Fri', sales: 800, expenses: 500 },
  { name: 'Sat', sales: 700, expenses: 450 },
];
