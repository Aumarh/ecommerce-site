import fs from 'node:fs';

console.log(fs);
const fabricDatabase = [
  {
    id: '1',
    slug: 'cotton-fabric',
    name: 'Cotton fabric',
    category: 'Cotton',
    image: '/images/fabric1.jpeg',
    price: 60,
    // rating: 4.1,
    quantity: 20,
    description: 'Egyptian cotton fabric',
  },
  {
    id: '2',
    slug: 'ankara-fabric',
    name: 'Ankara Fabric',
    category: 'Ankara',
    image: '/images/fabric2.jpeg',
    price: 80,
    // rating: 3.5,
    quantity: 20,
    description: 'A hollandise Anakara fabric',
  },
  {
    id: '3',
    slug: 'silk-fabric',
    name: 'Silk Fabric',
    category: 'Silk',
    image: '/images/fabric3.jpeg',
    price: 67,
    // rating: 4.4,
    quantity: 20,
    description: 'A silk fabric',
  },
  {
    id: '4',
    slug: 'lace-fabric',
    name: 'Lace Fabric',
    category: 'Lace',
    image: '/images/fabric4.jpeg',
    price: 75,
    // rating: 3.2,
    quantity: 0,
    description: 'A swiss lace fabric',
  },
  {
    id: '5',
    slug: 'adire-fabric',
    name: 'Adire Fabric',
    category: 'Adire',
    image: '/images/fabric5.jpeg',
    price: 98,
    // rating: 4.8,
    quantity: 20,
    description: 'A tye and dye Adire fabric',
  },
  {
    id: '6',
    slug: 'wool-fabric',
    name: 'Wool Fabric',
    category: 'Wool',
    image: '/images/fabric6.jpeg',
    price: 60,
    // rating: 2.8,
    quantity: 20,
    description: 'A wool fabric',
  },
];

export default fabricDatabase;

export async function getFabricDatabase() {
  const fabrics = await fabricDatabase;
  return fabrics.map((fabric) => fabric);
}
