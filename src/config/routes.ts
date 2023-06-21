export const Routes = {
  dashboard: '/',
  login: '/login',
  businessDetail: '/register',
  selectUser: '/selectUser',
  verifyUser: 'verifyUser',
  logout: '/logout',
  registerBusiness: '/registerBusiness',
  registerShop: '/registerShop',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  adminMyShops: '/my-shops',
  profile: '/profile',
  verifyCoupons: '/coupons/verify',
  settings: '/settings',
  channelSales: '/channelSales',
  marketPlace: '/marketPlace',
  mobileApp: '/mobileApp',
  payLink: '/payLink',
  businessettings: 'businessSettings',
  //devices:"devices",
  salesSummary: 'salesSummary',
  productSales: 'productSales',
  categorySales: 'categorySales',
  employeeSales: 'employeeSales',
  reportSales: 'reportSales',
  stockSaleReport:'stockSaleReport',
  taxSales: 'taxSales',
  shiftReport: 'shiftReport',
  storesettings: 'storesSettings',
  // storeSettings: '/vendor/settings',
  storeKeepers: '/vendor/store_keepers',
  profileUpdate: '/profile-update',
  checkout: '/orders/checkout',
  igniteShip:'/igniteShip',
  igniteShipCreate:'/settings/igniteShip/create',
  //  igniteShip: {
  //   ...routesFactory('/igniteShip'),
  // },
  user: {
    ...routesFactory('users'),
  },
  role: {
    ...routesFactory('roles'),
  },
  shopeDetails: {
    ...routesFactory('shopeDetails'),
  },
  shiftReports: {
    ...routesFactory('shiftReport'),
  },
  type: {
    ...routesFactory('/groups'),
  },
  brands: {
    ...routesFactory('brands'),
  },
  customer: {
    ...routesFactory('/customers'),
  },
  igniteShipEdit: {
    ...routesFactory('/igniteShipEdit'),
  },

 
  catalogs: '/catalog',
  salesChannel: '/salesChannel',
  category: {
    ...routesFactory('/categories'),
  },
  template: {
    ...routesFactory('/template'),
  },
  attribute: {
    ...routesFactory('/attributes'),
  },
  attributeValue: {
    ...routesFactory('/attribute-values'),
  },
  tag: {
    ...routesFactory('/tags'),
  },
  unit: {
    ...routesFactory('unit'),
  },
  invoice: {
    ...routesFactory('invoice'),
  },
  invoices: {
    ...routesFactory('invoices'),
  },
  editInvoice: {
    ...routesFactory('editInvoice'),
  },
  draft: {
    ...routesFactory('drafts'),
  },
  reviews: {
    ...routesFactory('/reviews'),
  },
  abuseReviews: {
    ...routesFactory('/abusive_reports'),
  },
  abuseReviewsReport: {
    ...routesFactory('/abusive_reports/reject'),
  },
  author: {
    ...routesFactory('authors'),
  },
  variant: {
    ...routesFactory('variant'),
  },
  coupon: {
    ...routesFactory('/coupons'),
  },
  manufacturer: {
    ...routesFactory('/manufacturers'),
  },
  importProduct: {
    ...routesFactory('importProducts'),
  },
  order: {
    ...routesFactory('/orders'),
  },
  creditNotes: {
    ...routesFactory('creditNotes'),
  },
  orderStatus: {
    ...routesFactory('/order-status'),
  },
  orderCreate: {
    ...routesFactory('/orders/create'),
  },
   

  products: {
    ...routesFactory('product'),
  },
  myAddress: {
    ...routesFactory('myAddress'),
  },
  product: {
    ...routesFactory('products'),
  },
  shop: {
    ...routesFactory('/shops'),
  },
  tax: {
    ...routesFactory('tax'),
  },
  subscription: {
    ...routesFactory('subscription'),
  },
  location: {
    ...routesFactory('location'),
  },
  devices: {
    ...routesFactory('devices'),
  },
  invoiceLayout: {
    ...routesFactory('invoiceLayout'),
  },
   coupons: {
    ...routesFactory('coupons'),
  },
  abandonedCart: {
    ...routesFactory('abandonedCart'),
  },
  shipping: {
    ...routesFactory('/shippings'),
  },
  withdraw: {
    ...routesFactory('/withdraws'),
  },
  staff: {
    ...routesFactory('/staffs'),
  },
  refund: {
    ...routesFactory('/refunds'),
  },
  question: {
    ...routesFactory('questions'),
  },
  stockTransfer: {
    ...routesFactory('stockTransfer'),
  },
};

function routesFactory(endpoint: string) {
  return {
    list: `${endpoint}`,
    create: `${endpoint}/create`,
    editWithoutLang: (slug: string, shop?: string) => {
      return `${endpoint}/${slug}/edit`;
    },
    edit: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/edit`
        : `${language}${endpoint}/${slug}/edit`;
    },
    translate: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/translate`
        : `${language}${endpoint}/${slug}/translate`;
    },
    details: (slug: string) => `${endpoint}/${slug}`,
  };
}
