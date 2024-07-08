export interface Product {
  title: string;
  description: string;
  price: number;
  controlName: string;
}

export const products = [
  {
    title: 'Seo',
    description: 'Programació duna web responsive completa',
    price: 300,
    controlName: 'seo',
  },
  {
    title: 'Ads',
    description: 'Programació duna web responsive completa',
    price: 400,
    controlName: 'ads',
  },
  {
    title: 'Web',
    description: 'Programació duna web responsive completa',
    price: 500,
    controlName: 'web',
  },
];
