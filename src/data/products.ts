export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    price: 100,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is product 2",
    price: 200,
    imageUrl: "https://via.placeholder.com/150",
  },
];
