export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'กาแฟ' | 'เบเกอรี่' | 'ของหวาน' | 'อื่นๆ';

// Mock data based on the provided HTML to ensure UI works even if Firestore is empty
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Steam Wallet',
    price: 100,
    category: 'กาแฟ',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770189389/NNitKLBl1mnkmMq28XmwlJYxR2ts5zEQOl3B8UJ5_pnbdct.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  },
  {
    id: '2',
    name: 'Cookierun Kingdom',
    price: 100,
    category: 'กาแฟ',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770192611/UErVK8U2nxJZrMcV9AUcJxhXrwHrqU2r82MbtbzG_n9eqpv.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  },
  {
    id: '3',
    name: 'Roblox Gift card',
    price: 100,
    category: 'ของหวาน',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770192331/DW2JErmyGRSAv1hTWjRddStfxlIlKb6cTfdqJPdv_dzkpiw.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  },
  {
    id: '4',
    name: 'Fate Grand Order',
    price: 100,
    category: 'เบเกอรี่',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770189453/MsqUxFXOcVFqLEm6mccfyf3nK9AwYWEGdnGgolx5_yk689z.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  },
  {
    id: '5',
    name: 'Minecraft Gift Card',
    price: 100,
    category: 'เบเกอรี่',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770189440/F6M4CAZmmYlLI4S2zSynl5AuinUxBvtlJWAKXvMa_gcsiny.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  },
  {
    id: '6',
    name: 'Uma Musume Pretty Derby',
    price: 100,
    category: 'กาแฟ',
    image: 'https://res.cloudinary.com/dopinbt23/image/upload/v1770189429/RyYKSUb59sBIp9AH7MiIVfXD6A1Of5WrZDDAjOiH_ttxgbz.avif',
    description: 'ส่วนผสม: กาแฟเข้มข้น + น้ำร้อน'
  }
];