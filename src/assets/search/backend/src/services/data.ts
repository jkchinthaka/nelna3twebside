import type { Product, Store } from "../types";

export const products: Product[] = [
  {
    productCode: "07NE05",
    name: "Nelna EASY 5Kg",
    category: "Frozen",
    description: "Bulk frozen chicken cuts for family use.",
    embedding: [0.3, 0.2, 0.1]
  },
  {
    productCode: "07NE12",
    name: "Nelna Chicken Sausages",
    category: "Processed",
    description: "Spicy chicken sausages for quick meals.",
    embedding: [0.4, 0.3, 0.2]
  },
  {
    productCode: "07NE20",
    name: "Nelna Frozen Nuggets",
    category: "Frozen",
    description: "Crispy chicken nuggets ready to fry.",
    embedding: [0.35, 0.2, 0.4]
  },
  {
    productCode: "07NE28",
    name: "Nelna Chicken Meatballs",
    category: "Processed",
    description: "Juicy chicken meatballs for curries.",
    embedding: [0.25, 0.4, 0.15]
  }
];

export const stores: Store[] = [
  {
    storeName: "Cargills Colombo 05",
    city: "Colombo",
    location: { lat: 6.893, lng: 79.855 },
    availableProducts: ["07NE05", "07NE12", "07NE20"],
    embedding: [0.3, 0.1, 0.2],
    contact: "+94 11 234 5678"
  },
  {
    storeName: "Keells Kandy City",
    city: "Kandy",
    location: { lat: 7.2906, lng: 80.6337 },
    availableProducts: ["07NE05", "07NE28"],
    embedding: [0.25, 0.2, 0.3],
    contact: "+94 81 222 3344"
  },
  {
    storeName: "Arpico Galle",
    city: "Galle",
    location: { lat: 6.0535, lng: 80.2209 },
    availableProducts: ["07NE12", "07NE20", "07NE28"],
    embedding: [0.32, 0.15, 0.25],
    contact: "+94 91 223 4455"
  }
];
