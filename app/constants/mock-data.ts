import type { CartItem, ServicesData, Technician, Testimonial } from '~/types/ServiceType'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: 'Thuỳ Đỗ',
    avatar: '/avatar1.png',
    image: '/review1.png',
    text: 'Mỗi lần ghé The OM Lounge là một lần mình tự thưởng cho bản thân. Mình rất thích không gian ở đây, vừa sang trọng vừa ấm cúng. Bộ nail thì khỏi chê luôn,..'
  },
  {
    id: 1,
    name: 'Thuỳ Đỗ',
    avatar: '/avatar2.png',
    image: '/review2.png',
    text: 'Mỗi lần ghé The OM Lounge là một lần mình tự thưởng cho bản thân. Mình rất thích không gian ở đây, vừa sang trọng vừa ấm cúng. Bộ nail thì khỏi chê luôn,..'
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: '/avatar3.png',
    image: '/review3.jpg',
    text: 'Mỗi lần ghé The OM Lounge là một lần mình tự thưởng cho bản thân. Mình rất thích không gian ở đây, vừa sang trọng vừa ấm cúng. Bộ nail thì khỏi chê luôn,..'
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: '/avatar3.png',
    image: '/review3.jpg',
    text: 'Mỗi lần ghé The OM Lounge là một lần mình tự thưởng cho bản thân. Mình rất thích không gian ở đây, vừa sang trọng vừa ấm cúng. Bộ nail thì khỏi chê luôn,..'
  }
]

export const SERVICES: ServicesData = {
  combo: [
    { id: 1, name: 'Perfectly Polished', description: 'Làm móng tay sắc (Mani hoặc Pedi...', price: '390k' },
    { id: 2, name: 'Perfectly Polished', description: 'Làm móng tay sắc (Mani hoặc Pedi...', price: '390k' },
    { id: 3, name: 'Perfectly Polished', description: 'Làm móng tay sắc (Mani hoặc Pedi...', price: '390k' },
    { id: 4, name: 'Perfectly Polished', description: 'Làm móng tay sắc (Mani hoặc Pedi...', price: '390k' }
  ],
  medicure: Array(6)
    .fill({ name: 'Perfectly Polished', description: 'Làm mới màu sắc (Mani hoặc Pedi)...', price: '390k' })
    .map((item, index) => ({ ...item, id: index + 1 })),
  pedicure: Array(4)
    .fill({ name: 'Perfectly Polished', description: 'Làm mới màu sắc (Mani hoặc Pedi)...', price: '390k' })
    .map((item, index) => ({ ...item, id: index + 1 })),
  effect: Array(6)
    .fill({ name: 'Perfectly Polished', description: 'Làm mới màu sắc (Mani hoặc Pedi)...', price: '390k' })
    .map((item, index) => ({ ...item, id: index + 1 })),
  drink: [
    { id: 1, name: 'Latte', price: '50k' },
    { id: 2, name: 'Espresso', price: '50k' },
    { id: 3, name: 'Americano', price: '50k' },
    { id: 4, name: 'Capuccino', price: '50k' },
    { id: 5, name: 'Milkshake', price: '50k' },
    { id: 6, name: 'Juice', price: '50k' }
  ]
}

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    parentId: null,
    name: 'Sơn gel',
    price: 264000,
    quantity: 1,
    image: '/son-gel.jpg',
    duration: 10
  },
  {
    id: '1-1',
    parentId: '1',
    name: 'Da beo',
    price: 88000,
    quantity: 1,
    image: '/effect-11.jpg',
    hasQuantityControl: true
  },
  {
    id: '1-2',
    parentId: '1',
    name: 'Da beo',
    price: 88000,
    quantity: 2,
    image: '/effect-22.jpg',
    hasQuantityControl: true
  },
  {
    id: '2',
    name: 'Mắt mèo',
    price: 88000,
    quantity: 1,
    image: '/mat-meo.jpg'
  },
  {
    id: '3',
    name: 'Sơn nhũ',
    price: 88000,
    quantity: 1,
    image: '/son-nhu.png',
    duration: 10
  },
  {
    id: '4',
    name: 'Sơn gel',
    price: 88000,
    quantity: 1,
    image: '/songel2.jpg',
    duration: 10
  }
]

export const TECHNICIANS: Technician[] = [
  { name: 'Võ Thị Bích Phượng', avatar: '/bicphuon.png' },
  { name: 'Nguyễn Minh Anh', avatar: '/bichphong2.jpg' }
]

export const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM'
]
