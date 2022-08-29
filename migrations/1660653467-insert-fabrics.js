const fabrics = [
  {
    id: '1',
    slug: 'cotton-fabric',
    name: 'Cotton fabric',
    category: 'Cotton',
    price: 60,
    quantity: 20,
    description: 'Egyptian cotton fabric',
  },
  {
    id: '2',
    slug: 'ankara-fabric',
    name: 'Ankara Fabric',
    category: 'Ankara',
    price: 80,
    quantity: 20,
    description: 'A hollandise Anakara fabric',
  },
  {
    id: '3',
    slug: 'silk-fabric',
    name: 'Silk Fabric',
    category: 'Silk',
    price: 67,
    quantity: 20,
    description: 'A silk fabric',
  },
  {
    id: '4',
    slug: 'lace-fabric',
    name: 'Lace Fabric',
    category: 'Lace',
    price: 75,
    quantity: 0,
    description: 'A swiss lace fabric',
  },
  {
    id: '5',
    slug: 'adire-fabric',
    name: 'Adire Fabric',
    category: 'Adire',
    price: 98,
    quantity: 20,
    description: 'A tye and dye Adire fabric',
  },
  {
    id: '6',
    slug: 'wool-fabric',
    name: 'Wool Fabric',
    category: 'Wool',
    price: 60,
    quantity: 20,
    description: 'A wool fabric',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO fabrics ${sql(
    fabrics,
    'slug',
    'name',
    'category',
    'price',
    'quantity',
    'description',
  )}
	`;
};

exports.down = async (sql) => {
  for (const fabric of fabrics) {
    await sql`
		DELETE FROM fabrics WHERE slug = ${fabric.slug} AND
		name = ${fabric.name} AND
		category = ${fabric.category} AND
		price = ${fabric.price} AND
		quantity = ${fabric.quantity} AND
		description = ${fabric.description}
		`;
  }
};
