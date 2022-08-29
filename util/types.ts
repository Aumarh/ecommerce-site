export type CookieCart = {
  id: number;
  quantity: number;
};

export type ProductDatabase = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
};

// {
//     id: '2',
//     slug: 'ankara-fabric',
//     name: 'Ankara Fabric',
//     category: 'Ankara',
//     price: 80,
//     // rating: 3.5,
//     quantity: 20,
//     description: 'A hollandise Anakara fabric',
//   },
