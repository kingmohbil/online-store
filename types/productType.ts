export default interface productType {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'unisex';
  available: boolean;
}
