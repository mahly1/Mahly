import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  Bell, 
  Home, 
  User, 
  Search, 
  MapPin, 
  ShoppingBasket, 
  Store, 
  Check, 
  ArrowRight,
  Package,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
  Camera,
  LogOut,
  FileText,
  Truck,
  Users,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA, MOCK_NOTIFICATIONS, MOCK_ORDERS, B2B_PRODUCTS, CONSUMER_PRODUCTS } from './constants';
import { UserProfile, UserRole } from './types';

// --- SVGs for Custom Icons ---
const CustomIcons = {
  Sugar: () => (
    <svg className="w-8 h-8 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21v-9" />
      <path d="M4 10l8-8 8 8v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
      <path d="M9 14h6" />
    </svg>
  ),
  Chips: () => (
    <svg className="w-8 h-8 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 2v2" />
      <path d="M15 2v2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Egg: () => (
    <svg className="w-8 h-8 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" />
    </svg>
  ),
  Oil: () => (
    <svg className="w-12 h-12 mx-auto mb-2 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
       <path d="M7 2h10v3H7zM6 6h12v1H6zM6 8h12l1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L6 8z" />
    </svg>
  ),
  Logo: () => (
    <div className="flex flex-col items-center justify-center">
       <div className="relative">
          <div className="bg-green-600 text-white p-3 rounded-t-lg w-16 h-10 flex items-center justify-center mx-auto shadow-lg relative z-10">
            <div className="w-full h-full border-b-2 border-white/20 flex gap-1 justify-center items-end pb-1">
                 <div className="w-1 h-4 bg-white/50 rounded-full"></div>
                 <div className="w-1 h-4 bg-white/50 rounded-full"></div>
                 <div className="w-1 h-4 bg-white/50 rounded-full"></div>
            </div>
          </div>
          <div className="w-14 h-10 border-4 border-green-800 rounded-b-xl mx-auto -mt-1 bg-white relative z-0 flex items-center justify-center">
             <div className="flex gap-1">
                 <div className="w-0.5 h-4 bg-green-800 rotate-12"></div>
                 <div className="w-0.5 h-4 bg-green-800 -rotate-12"></div>
             </div>
          </div>
       </div>
       <h1 className="text-4xl font-extrabold text-green-800 mt-2 tracking-tighter">محـلّـي</h1>
    </div>
  )
};

// --- Shared Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, disabled = false }: any) => {
  const baseStyle = "py-3 px-6 rounded-full font-bold transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-green-800 text-white hover:bg-green-900 disabled:bg-gray-300 disabled:shadow-none",
    secondary: "bg-white text-green-800 border-2 border-green-800 hover:bg-green-50",
    outline: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 border border-red-200"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const InputField = ({ label, placeholder, type = "text", value, onChange, icon: Icon, required = false }: any) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 pr-10 pl-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-right shadow-sm"
      />
      {Icon && <Icon className="absolute right-3 top-3.5 text-gray-400 w-5 h-5" />}
    </div>
  </div>
);

const BottomNav = ({ userRole }: { userRole: 'MERCHANT' | 'CONSUMER' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSearchClick = () => {
    if (userRole === 'MERCHANT') {
      navigate('/merchant/market');
    } else {
      navigate('/consumer/shop');
    }
  };

  const handleHomeClick = () => {
     navigate('/home');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 max-w-md mx-auto">
      <button onClick={() => navigate('/profile')} className={`flex flex-col items-center ${isActive('/profile') ? 'text-green-700' : 'text-gray-400'}`}>
        <User className="w-6 h-6" strokeWidth={isActive('/profile') ? 3 : 2} />
        <span className="text-xs font-medium mt-1">البروفايل</span>
      </button>
      
      <button onClick={handleSearchClick} className={`flex flex-col items-center ${(isActive('/merchant/market') || isActive('/consumer/shop')) ? 'text-green-700' : 'text-gray-400'}`}>
        <Search className="w-6 h-6" strokeWidth={(isActive('/merchant/market') || isActive('/consumer/shop')) ? 3 : 2} />
        <span className="text-xs font-medium mt-1">{userRole === 'MERCHANT' ? 'طلب طلبية' : 'تسوق'}</span>
      </button>

      <button onClick={handleHomeClick} className={`flex flex-col items-center ${isActive('/home') ? 'text-green-700' : 'text-gray-400'}`}>
        <Home className="w-6 h-6" strokeWidth={isActive('/home') ? 3 : 2} />
        <span className="text-xs font-medium mt-1">الرئيسية</span>
      </button>
    </div>
  );
};

// --- Auth Components ---

const AuthStart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
       <div className="mb-12">
          <CustomIcons.Logo />
       </div>
       <div className="space-y-4 w-full max-w-sm">
         <Button fullWidth onClick={() => navigate('/login')}>
           تسجيل الدخول
         </Button>
         <Button fullWidth variant="secondary" onClick={() => navigate('/role-select')}>
           إنشاء حساب جديد
         </Button>
       </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: (data: UserProfile) => void }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) return;
    
    // Create a mock user that uses the entered email/phone so the data feels connected
    const mockUser: UserProfile = role === 'MERCHANT' ? {
      name: 'تاجر محلي', // Generic name since login doesn't ask for it
      phone: email, // Use the input as phone/email
      role: 'MERCHANT',
      shopName: 'سوبر ماركت (تجريبي)',
      address: 'القاهرة، مصر',
      age: '35',
      workerCount: '3'
    } : {
      name: 'مستخدم محلي',
      phone: email, // Use the input as phone/email
      role: 'CONSUMER',
      address: 'القاهرة، مصر',
      age: '28'
    };
    onLogin(mockUser);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 scale-75">
            <CustomIcons.Logo />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">تسجيل الدخول كـ:</h2>
        <div className="space-y-4 w-full max-w-sm">
          <button 
            onClick={() => setRole('MERCHANT')}
            className="w-full bg-green-800 text-white p-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-900 transition-colors shadow-lg"
          >
            <Store className="w-8 h-8" />
            <span className="text-2xl font-bold">تاجر</span>
          </button>
          <button 
            onClick={() => setRole('CONSUMER')}
            className="w-full bg-green-700 text-white p-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-800 transition-colors shadow-lg"
          >
            <ShoppingCart className="w-8 h-8" />
            <span className="text-2xl font-bold">مستهلك</span>
          </button>
          <button onClick={() => navigate(-1)} className="text-gray-500 text-sm mt-4">رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="mb-6 scale-75">
        <CustomIcons.Logo />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل دخول {role === 'MERCHANT' ? 'التاجر' : 'المستهلك'}</h2>
      <button onClick={() => setRole(null)} className="text-sm text-green-700 font-bold mb-6">تغيير نوع الحساب</button>
      
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-2">
        <InputField 
          label="البريد الإلكتروني / رقم الهاتف" 
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required 
          icon={User} 
        />
        <InputField 
          label="كلمة المرور" 
          type="password" 
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required 
          icon={() => <span className="absolute right-3 top-3.5 text-gray-400 text-xs">🔒</span>} 
        />
        <div className="pt-4">
          <Button fullWidth disabled={!email || !password}>دخول</Button>
        </div>
      </form>
    </div>
  );
};

const RoleSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
       <div className="mb-12 scale-75">
          <CustomIcons.Logo />
       </div>
       <h2 className="text-2xl font-bold text-gray-800 mb-8">إنشاء حساب كـ:</h2>
       <div className="space-y-4 w-full max-w-sm">
         <button 
           onClick={() => navigate('/register/merchant')}
           className="w-full bg-green-800 text-white p-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-900 transition-colors shadow-lg"
         >
           <Store className="w-8 h-8" />
           <span className="text-2xl font-bold">تاجر</span>
         </button>
         <button 
           onClick={() => navigate('/register/consumer')}
           className="w-full bg-green-700 text-white p-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-800 transition-colors shadow-lg"
         >
           <ShoppingCart className="w-8 h-8" />
           <span className="text-2xl font-bold">مستهلك</span>
         </button>
         <button onClick={() => navigate(-1)} className="text-gray-500 text-sm mt-4">رجوع</button>
       </div>
    </div>
  );
};

const RegisterMerchant = ({ onRegister }: { onRegister: (data: UserProfile) => void }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({ role: 'MERCHANT' });
  const navigate = useNavigate();

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = formData.name && formData.shopName && formData.phone && formData.age && formData.address && formData.password;

  return (
    <div className="min-h-screen bg-white p-6 pb-20">
      <div className="flex items-center mb-4">
         <button onClick={() => navigate(-1)}><ArrowRight className="text-gray-700" /></button>
         <h2 className="text-2xl font-bold text-center flex-1 mr-[-24px] text-gray-900">بيانات التاجر</h2>
      </div>
      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if(isValid) onRegister(formData as UserProfile); }}>
        <InputField label="الاسم الكامل" value={formData.name || ''} onChange={(e: any) => handleChange('name', e.target.value)} required icon={User} />
        <InputField label="اسم المحل" value={formData.shopName || ''} onChange={(e: any) => handleChange('shopName', e.target.value)} required icon={Store} />
        <InputField label="رقم التليفون" value={formData.phone || ''} onChange={(e: any) => handleChange('phone', e.target.value)} type="tel" required icon={() => <span>📞</span>} />
        <InputField label="السن" value={formData.age || ''} onChange={(e: any) => handleChange('age', e.target.value)} type="number" required />
        <InputField label="عنوان المحل" value={formData.address || ''} onChange={(e: any) => handleChange('address', e.target.value)} required icon={MapPin} />
        <InputField label="عدد العاملين" value={formData.workerCount || ''} onChange={(e: any) => handleChange('workerCount', e.target.value)} type="number" />
        <InputField label="كلمة المرور" value={formData.password || ''} onChange={(e: any) => handleChange('password', e.target.value)} type="password" required />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-right">صور المحل</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-sm">اضغط لرفع صور</span>
          </div>
        </div>

        <div className="pt-4">
          <Button fullWidth disabled={!isValid}>إنشاء الحساب</Button>
        </div>
      </form>
    </div>
  );
};

const RegisterConsumer = ({ onRegister }: { onRegister: (data: UserProfile) => void }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({ role: 'CONSUMER' });
  const navigate = useNavigate();

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = formData.name && formData.phone && formData.password;

  return (
    <div className="min-h-screen bg-white p-6 pb-20 flex flex-col justify-center">
      <div className="flex items-center mb-6">
         <button onClick={() => navigate(-1)}><ArrowRight className="text-gray-700" /></button>
         <h2 className="text-2xl font-bold text-center flex-1 mr-[-24px] text-gray-900">بيانات المستهلك</h2>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if(isValid) onRegister(formData as UserProfile); }}>
        <InputField label="الاسم الكامل" value={formData.name || ''} onChange={(e: any) => handleChange('name', e.target.value)} required icon={User} />
        <InputField label="رقم التليفون" value={formData.phone || ''} onChange={(e: any) => handleChange('phone', e.target.value)} type="tel" required icon={() => <span>📞</span>} />
        <InputField label="كلمة المرور" value={formData.password || ''} onChange={(e: any) => handleChange('password', e.target.value)} type="password" required />
        
        <div className="pt-8">
          <Button fullWidth disabled={!isValid}>إنشاء الحساب</Button>
        </div>
      </form>
    </div>
  );
};

// --- Portal / Home Screen ---

const HomePortal = ({ user }: { user: UserProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header Section */}
      <div className="bg-green-800 text-white p-6 rounded-b-3xl shadow-lg pb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-800 text-2xl font-bold border-4 border-green-600">
             {user.name.charAt(0)}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="opacity-80 text-sm">{user.role === 'MERCHANT' ? user.shopName : 'مستخدم محلي'}</p>
            {user.address && <div className="flex items-center gap-1 text-xs mt-1 opacity-70"><MapPin className="w-3 h-3"/> {user.address}</div>}
          </div>
        </div>
      </div>

      {/* Main Action Area */}
      <div className="p-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {user.role === 'MERCHANT' ? 'أهلاً بك يا تاجر!' : 'أهلاً بك!'}
          </h3>
          <p className="text-gray-500 mb-6">
            {user.role === 'MERCHANT' 
              ? 'يمكنك إدارة محلك وطلباتك من لوحة التحكم' 
              : 'تصفح المنتجات واطلب احتياجاتك المنزلية بسهولة'}
          </p>

          <Button fullWidth onClick={() => user.role === 'MERCHANT' ? navigate('/merchant/dashboard') : navigate('/consumer/shop')}>
            {user.role === 'MERCHANT' ? 'الذهاب للوحة التحكم' : 'بدء التسوق'}
          </Button>
        </div>

        {/* Quick Stats or Promo */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
             <div className="text-green-700 font-bold text-lg">عروض</div>
             <div className="text-gray-600 text-sm">خصومات حصرية</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
             <div className="text-green-700 font-bold text-lg">الدعم</div>
             <div className="text-gray-600 text-sm">24/7 خدمة عملاء</div>
          </div>
        </div>
      </div>

      <BottomNav userRole={user.role} />
    </div>
  );
};

// --- Generic Checkout (Used by Consumer & Merchant) ---

const Checkout = ({ 
  userRole, 
  onConfirm 
}: { 
  userRole: UserRole, 
  onConfirm: () => void 
}) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'cash' | 'visa'>('cash');

  // Hardcoded totals for demo
  const subtotal = 1500;
  const delivery = 50;
  const total = 1550;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
       <div className="flex items-center mb-6">
         <button onClick={() => navigate(-1)}><ArrowRight className="text-gray-700" /></button>
         <h1 className="text-xl font-bold flex-1 text-center mr-[-24px]">الدفع</h1>
       </div>

       <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
         <h3 className="font-bold text-gray-800 mb-4 text-right">طريقة الدفع</h3>
         
         <div 
           onClick={() => setMethod('cash')}
           className={`flex items-center justify-between p-4 rounded-xl border mb-3 cursor-pointer ${method === 'cash' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
         >
            <div className="flex items-center gap-3">
              <Banknote className="text-green-700" />
              <span className="font-bold text-gray-700">دفع عند الاستلام</span>
            </div>
            {method === 'cash' && <div className="w-4 h-4 rounded-full bg-green-600"></div>}
         </div>

         <div 
           onClick={() => setMethod('visa')}
           className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${method === 'visa' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
         >
            <div className="flex items-center gap-3">
              <CreditCard className="text-green-700" />
              <span className="font-bold text-gray-700">بطاقة ائتمان (فيزا)</span>
            </div>
            {method === 'visa' && <div className="w-4 h-4 rounded-full bg-green-600"></div>}
         </div>
       </div>

       <div className="bg-white rounded-2xl shadow-sm p-6 mb-auto">
         <h3 className="font-bold text-gray-800 mb-4 text-right">ملخص الطلب</h3>
         <div className="flex justify-between mb-2 text-sm">
            <span>المجموع الفرعي</span>
            <span>{userRole === 'MERCHANT' ? '3,450' : '150'} ج.م</span>
         </div>
         <div className="flex justify-between mb-2 text-sm">
            <span>التوصيل</span>
            <span>{userRole === 'MERCHANT' ? '100' : '20'} ج.م</span>
         </div>
         <div className="border-t my-3"></div>
         <div className="flex justify-between font-bold text-lg text-green-800">
            <span>الإجمالي</span>
            <span>{userRole === 'MERCHANT' ? '3,550' : '170'} ج.م</span>
         </div>
       </div>

       <Button fullWidth onClick={onConfirm}>
         تأكيد الطلب
       </Button>
    </div>
  );
};

// --- Consumer Flow ---

const ConsumerShop = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
       {/* Header */}
       <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-30">
        <div className="relative">
           <ShoppingCart className="w-6 h-6 text-green-800" />
           {totalItems > 0 && (
             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
               {totalItems}
             </span>
           )}
        </div>
        <h1 className="text-xl font-bold text-gray-900">تسوق المنتجات</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {CONSUMER_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-20 w-full flex items-center justify-center mb-2 bg-gray-50 rounded-lg">
               {product.category === 'dry' && <Package className="w-10 h-10 text-gray-400" />}
               {product.category === 'oil' && <CustomIcons.Oil />}
               {product.category === 'snacks' && <div className="text-3xl">🍟</div>}
               {product.category === 'drinks' && <div className="text-3xl">🥤</div>}
               {product.category === 'fresh' && <div className="text-3xl">🥚</div>}
            </div>

            <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
            <p className="text-gray-500 text-xs mb-1">{product.description}</p>
            <p className="text-green-800 font-bold mb-2 text-sm">{product.price} ج.م</p>

            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-full justify-between">
               <button 
                 onClick={() => updateCart(product.id, 1)}
                 className="bg-green-800 text-white w-6 h-6 rounded flex items-center justify-center active:bg-green-900"
               >
                 <Plus className="w-3 h-3" />
               </button>
               <span className="font-bold text-gray-900 text-sm">{cart[product.id] || 0}</span>
               <button 
                 onClick={() => updateCart(product.id, -1)}
                 className="bg-gray-200 text-gray-700 w-6 h-6 rounded flex items-center justify-center active:bg-gray-300"
               >
                 <Minus className="w-3 h-3" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto">
          <Button fullWidth onClick={() => navigate('/consumer/checkout')}>
             استمرار للدفع ({totalItems})
          </Button>
        </div>
      )}

      <BottomNav userRole="CONSUMER" />
    </div>
  );
};

const SuccessScreen = ({ msg }: { msg: string }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
         <Check className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">تم بنجاح!</h2>
      <p className="text-gray-600 mb-8">{msg}</p>
      <Button onClick={() => navigate('/home')}>العودة للرئيسية</Button>
    </div>
  );
};

// --- Merchant Flow ---

const MerchantDashboard = ({ user }: { user: UserProfile }) => {
  const navigate = useNavigate();

  const QuickAction = ({ icon: Icon, label, onClick, color = "bg-green-100 text-green-800" }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
       <div className={`p-3 rounded-full ${color}`}>
         <Icon className="w-6 h-6" />
       </div>
       <span className="text-sm font-bold text-gray-700">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-800 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.shopName}</h1>
            <p className="text-gray-500 text-sm">{user.name}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
         <QuickAction 
            icon={Bell} 
            label="الإشعارات" 
            onClick={() => navigate('/merchant/notifications')}
            color="bg-orange-100 text-orange-600"
         />
         <QuickAction 
            icon={ShoppingBasket} 
            label="طلبات العملاء" 
            onClick={() => navigate('/merchant/orders')}
         />
         <QuickAction 
            icon={Truck} 
            label="طلب بضاعة" 
            onClick={() => navigate('/merchant/market')}
         />
         <QuickAction 
            icon={FileText} 
            label="الفواتير" 
            onClick={() => navigate('/merchant/invoices')}
            color="bg-blue-100 text-blue-600"
         />
      </div>

      {/* Stats Summary */}
      <div className="px-6">
         <h3 className="font-bold text-gray-800 mb-3 text-right">ملخص اليوم</h3>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-around">
            <div className="text-center">
               <span className="block text-2xl font-bold text-green-700">12</span>
               <span className="text-xs text-gray-500">طلب جديد</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
               <span className="block text-2xl font-bold text-green-700">850</span>
               <span className="text-xs text-gray-500">مبيعات (ج.م)</span>
            </div>
         </div>
      </div>

      <BottomNav userRole="MERCHANT" />
    </div>
  );
};

const MerchantOrders = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white p-4 shadow-sm flex items-center gap-2 sticky top-0 z-20">
                <button onClick={() => navigate(-1)}><ArrowRight /></button>
                <h1 className="text-lg font-bold">طلبات العملاء</h1>
            </div>
            <div className="p-4 space-y-4">
                {/* Demo Orders */}
                {Object.values(MOCK_ORDERS).map((order) => (
                    <div key={order.id} onClick={() => navigate(`/order/${order.id}`)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-lg">طلب من {order.customerName}</h3>
                             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">انتظار</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">{order.items.length} منتجات - {order.customerAddress}</p>
                        <div className="text-xs text-gray-400">{new Date(order.timestamp).toLocaleTimeString('ar-EG')}</div>
                    </div>
                ))}
            </div>
            <BottomNav userRole="MERCHANT" />
        </div>
    )
}

const B2BMarket = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
       {/* Header */}
       <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-30">
        <div className="relative">
           <ShoppingCart className="w-6 h-6 text-green-800" />
           {totalItems > 0 && (
             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
               {totalItems}
             </span>
           )}
        </div>
        <h1 className="text-xl font-bold text-gray-900">طلب بضاعة (جملة)</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {B2B_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-24 w-full flex items-center justify-center mb-2">
               {product.category === 'dry' && <Package className="w-16 h-16 text-gray-300" />}
               {product.category === 'oil' && <CustomIcons.Oil />}
               {product.category === 'snacks' && <div className="text-4xl">🍟</div>}
               {product.category === 'drinks' && <div className="text-4xl">🥤</div>}
               {product.category === 'spices' && <div className="text-4xl">🧂</div>}
            </div>

            <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
            {product.description && <p className="text-gray-500 text-sm mb-1">{product.description}</p>}
            <p className="text-green-800 font-bold mb-3">{product.price} ج.م</p>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1 w-full justify-between">
               <button 
                 onClick={() => updateCart(product.id, 1)}
                 className="bg-green-800 text-white w-8 h-8 rounded-md flex items-center justify-center active:bg-green-900"
               >
                 <Plus className="w-4 h-4" />
               </button>
               <span className="font-bold text-gray-900 w-4">{cart[product.id] || 0}</span>
               <button 
                 onClick={() => updateCart(product.id, -1)}
                 className="bg-green-800 text-white w-8 h-8 rounded-md flex items-center justify-center active:bg-green-900"
               >
                 <Minus className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto">
          <Button fullWidth onClick={() => navigate('/merchant/checkout')}>
             استمرار للدفع ({totalItems})
          </Button>
        </div>
      )}

      <BottomNav userRole="MERCHANT" />
    </div>
  );
};

// --- Reused/Moved Components ---

const NotificationCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-6 shadow-sm flex items-center justify-between sticky top-0 z-30">
        <button onClick={() => navigate(-1)}>
           <ArrowRight className="w-6 h-6 text-green-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">الإشعارات</h1>
        <div className="w-6"></div> 
      </div>

      <div className="p-4 space-y-4">
        {MOCK_NOTIFICATIONS.map((note) => (
           <div 
             key={note.id} 
             onClick={() => note.orderId ? navigate(`/order/${note.orderId}`) : null}
             className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative cursor-pointer active:scale-98 transition-transform`}
           >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                   <div className="bg-green-800 p-3 rounded-full text-white shrink-0">
                      <ShoppingBasket className="w-6 h-6" />
                   </div>
                   <div className="text-right">
                      <h3 className="font-bold text-lg text-gray-900">{note.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{note.subtitle}</p>
                   </div>
                </div>
              </div>
              <span className="absolute top-4 left-4 text-xs font-bold text-gray-500">{note.time}</span>
           </div>
        ))}
      </div>
      <BottomNav userRole="MERCHANT" />
    </div>
  );
};

const OrderDetails = () => {
  const navigate = useNavigate();
  // In a real app, use useParams to fetch order
  const order = MOCK_ORDERS['ord-001'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-6">
             <div className="relative mb-4">
                 <Store className="w-12 h-12 text-green-700" />
                 <span className="text-xs font-bold text-green-800 mt-1 block">محلي</span>
             </div>
             <h1 className="text-3xl font-extrabold text-green-900 mb-6">طلب جديد من {order.customerName}</h1>
          </div>

          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 relative">
             <div className="space-y-6">
                {order.items.map((item) => (
                   <div key={item.id} className="flex items-center justify-end gap-4 text-right">
                      <span className="text-xl font-bold text-gray-800">{item.quantity} {item.name}</span>
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                        {item.iconType === 'chips' && <CustomIcons.Chips />}
                        {item.iconType === 'sugar' && <CustomIcons.Sugar />}
                        {item.iconType === 'eggs' && <CustomIcons.Egg />}
                      </div>
                   </div>
                ))}
             </div>
             <div className="my-6 border-t border-gray-200"></div>
             <div className="flex items-center justify-end gap-2 text-right">
                <span className="text-lg font-medium text-gray-800">{order.customerAddress}</span>
                <MapPin className="text-green-700 w-6 h-6 shrink-0" />
             </div>
          </div>

          <div className="w-full max-w-md mt-8 space-y-4">
             <Button fullWidth onClick={() => navigate('/merchant/order-success')}>
                تأكيد الطلب
             </Button>
             <Button fullWidth variant="secondary" onClick={() => navigate('/merchant/notifications')}>
                تجاهل
             </Button>
          </div>
       </div>
       <BottomNav userRole="MERCHANT" />
    </div>
  );
};

const InvoicesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-green-50 p-6 rounded-b-3xl shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
              <button onClick={() => navigate(-1)}><ArrowRight /></button>
              <h1 className="text-2xl font-bold text-gray-900">الفواتير والحسابات</h1>
          </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center">
             <span className="text-gray-600 font-bold mb-2">إجمالي المبيعات</span>
             <span className="text-2xl font-extrabold text-green-800">15,450 ج.م</span>
             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold mt-2">↑ 8%+</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center">
             <span className="text-gray-600 font-bold mb-2">المصروفات</span>
             <span className="text-2xl font-extrabold text-green-800">4,200 ج.م</span>
             <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold mt-2">↓ 3%-</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-right text-lg font-bold text-gray-800 mb-4">تحليل المبيعات الأسبوعي</h3>
        <div className="h-48 w-full bg-white rounded-xl shadow-sm p-2 border border-gray-100">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <XAxis dataKey="name" hide />
                <Area type="monotone" dataKey="sales" stroke="#166534" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           {[1234, 1233, 1234, 123, 1234].map((id, idx) => (
             <div key={idx} className="flex justify-between items-center p-4 border-b last:border-0 border-gray-100">
                <span className="text-gray-500 text-sm font-medium">منذ {idx * 2 + 2} ساعة</span>
                <span className="font-bold text-gray-800 text-right">فاتورة رقم #{id} - <span className="text-gray-900">{(idx === 1 ? 1200 : 500)} ج.م</span></span>
             </div>
           ))}
        </div>
      </div>
      <BottomNav userRole="MERCHANT" />
    </div>
  );
};

const ProfilePlaceholder = ({ user, onLogout }: { user: UserProfile, onLogout: () => void }) => (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
        <div className="bg-white rounded-2xl shadow p-6 text-center mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">الملف الشخصي</h1>
            <div className="w-24 h-24 bg-green-800 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 border-4 border-green-100">
                {user.name.charAt(0)}
            </div>
            
            <div className="text-right space-y-4">
                <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-gray-500 text-xs">الاسم</span>
                    </div>
                    <span className="font-bold text-gray-900 mr-6 block">{user.name}</span>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-600 text-xs">📞</span>
                        <span className="text-gray-500 text-xs">الهاتف</span>
                    </div>
                    <span className="font-bold text-gray-900 mr-6 block">{user.phone}</span>
                </div>

                {user.role === 'MERCHANT' && (
                  <>
                    <div className="border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Store className="w-4 h-4 text-green-600" />
                            <span className="text-gray-500 text-xs">اسم المحل</span>
                        </div>
                        <span className="font-bold text-gray-900 mr-6 block">{user.shopName}</span>
                    </div>
                    
                    {user.workerCount && (
                      <div className="border-b border-gray-100 pb-3">
                          <div className="flex items-center gap-2 mb-1">
                              <Users className="w-4 h-4 text-green-600" />
                              <span className="text-gray-500 text-xs">عدد العاملين</span>
                          </div>
                          <span className="font-bold text-gray-900 mr-6 block">{user.workerCount}</span>
                      </div>
                    )}
                  </>
                )}

                {user.address && (
                    <div className="border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span className="text-gray-500 text-xs">العنوان</span>
                        </div>
                        <span className="font-bold text-gray-900 mr-6 block">{user.address}</span>
                    </div>
                )}
                
                {user.age && (
                  <div className="border-b border-gray-100 pb-3">
                       <div className="flex items-center gap-2 mb-1">
                           <Calendar className="w-4 h-4 text-green-600" />
                           <span className="text-gray-500 text-xs">السن</span>
                       </div>
                       <span className="font-bold text-gray-900 mr-6 block">{user.age} سنة</span>
                  </div>
                )}

                <div className="pb-2">
                    <span className="text-gray-500 block text-xs mb-1 mr-6">نوع الحساب</span>
                    <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm inline-block mr-6">
                      {user.role === 'MERCHANT' ? 'تاجر' : 'مستهلك'}
                    </span>
                </div>
            </div>

            <Button variant="outline" fullWidth className="mt-8 text-red-600 border-red-200 hover:bg-red-50" onClick={onLogout}>
                <LogOut className="w-4 h-4" /> تسجيل الخروج
            </Button>
        </div>
        <BottomNav userRole={user.role} />
    </div>
);

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth-start');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="slide-in">
        <CustomIcons.Logo />
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  // Global State simulating Auth
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const handleLogin = (userData: UserProfile) => {
      setUser(userData);
      navigate('/home');
  };

  const handleRegister = (userData: UserProfile) => {
      setUser(userData);
      navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/auth-start');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl overflow-hidden relative font-cairo">
      <Routes>
        <Route path="/" element={<Splash />} />
        
        {/* Auth Flow */}
        <Route path="/auth-start" element={<AuthStart />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/role-select" element={<RoleSelection />} />
        <Route path="/register/merchant" element={<RegisterMerchant onRegister={handleRegister} />} />
        <Route path="/register/consumer" element={<RegisterConsumer onRegister={handleRegister} />} />

        {/* Portal & Shared */}
        <Route path="/home" element={user ? <HomePortal user={user} /> : <Navigate to="/auth-start" />} />
        <Route path="/profile" element={user ? <ProfilePlaceholder user={user} onLogout={handleLogout} /> : <Navigate to="/auth-start" />} />

        {/* Merchant Routes */}
        <Route path="/merchant/dashboard" element={user && user.role === 'MERCHANT' ? <MerchantDashboard user={user} /> : <Navigate to="/home" />} />
        <Route path="/merchant/market" element={<B2BMarket />} />
        <Route path="/merchant/checkout" element={<Checkout userRole="MERCHANT" onConfirm={() => navigate('/merchant/order-success')} />} />
        <Route path="/merchant/notifications" element={<NotificationCenter />} />
        <Route path="/merchant/orders" element={<MerchantOrders />} />
        <Route path="/merchant/invoices" element={<InvoicesPage />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/merchant/order-success" element={<SuccessScreen msg="تم تأكيد الطلبية بنجاح، جاري التجهيز والشحن!" />} />

        {/* Consumer Routes */}
        <Route path="/consumer/shop" element={<ConsumerShop />} />
        <Route path="/consumer/checkout" element={<Checkout userRole="CONSUMER" onConfirm={() => navigate('/consumer/success')} />} />
        <Route path="/consumer/success" element={<SuccessScreen msg="تم تأكيد طلبك بنجاح! طلبك على وشك الوصول" />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// Wrapper to provide Router to App
const AppWrapper = () => (
    <HashRouter>
        <App />
    </HashRouter>
);

export default AppWrapper;