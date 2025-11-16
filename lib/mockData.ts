import { Product, Ticket } from "./types";

export const tickets: Ticket[] = [
  {
    id: "30",
    label: "Ticket 30€",
    ticketPrice: 30,
    totalSeconds: 120,
    valueMinBase: 60,
    valueMinBeautyVesEdition: 90,
  },
  {
    id: "50",
    label: "Ticket 50€",
    ticketPrice: 50,
    totalSeconds: 210,
    valueMinBase: 100,
    valueMinBeautyVesEdition: 150,
  },
  {
    id: "80",
    label: "Ticket 80€",
    ticketPrice: 80,
    totalSeconds: 270,
    valueMinBase: 160,
    valueMinBeautyVesEdition: 240,
  },
  {
    id: "100",
    label: "Ticket 100€",
    ticketPrice: 100,
    totalSeconds: 330,
    valueMinBase: 220,
    valueMinBeautyVesEdition: 320,
  },
];

const makeupImages = [
  "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
];

const skincareImages = [
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
];

const perfumeImages = [
  "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
];

const accessoryImages = [
  "https://images.unsplash.com/photo-1590152564357-7786c2c2ef26?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1612810433463-d7d141e3583e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1619452748576-ff572934c4a5?auto=format&fit=crop&w=600&q=80",
];

const getImage = (category: Product["category"], index: number) => {
  const pools = {
    makeup: makeupImages,
    skincare: skincareImages,
    perfume: perfumeImages,
    accessory: accessoryImages,
  } as const;

  const pool = pools[category];
  return pool[index % pool.length];
};

const heroItems = [
  { name: "Power Lash Mascara Noir", category: "makeup", originalPrice: 32, purchaseCost: 8, hypeScore: 90 },
  { name: "Drama Lift Mascara Brown", category: "makeup", originalPrice: 30, purchaseCost: 7, hypeScore: 86 },
  { name: "Feather Lash Mascara Blue", category: "makeup", originalPrice: 28, purchaseCost: 6, hypeScore: 82 },
  { name: "Skyline Volume Mascara", category: "makeup", originalPrice: 29, purchaseCost: 7, hypeScore: 84 },
  { name: "Velvet Impact Mascara", category: "makeup", originalPrice: 31, purchaseCost: 8, hypeScore: 88 },
  { name: "Soft Focus Concealer Porcelain", category: "makeup", originalPrice: 26, purchaseCost: 6, hypeScore: 80 },
  { name: "Soft Focus Concealer Honey", category: "makeup", originalPrice: 25, purchaseCost: 5, hypeScore: 78 },
  { name: "Soft Focus Concealer Sand", category: "makeup", originalPrice: 27, purchaseCost: 6, hypeScore: 82 },
  { name: "Bright Awake Concealer Peach", category: "makeup", originalPrice: 24, purchaseCost: 5, hypeScore: 76 },
  { name: "Bright Awake Concealer Olive", category: "makeup", originalPrice: 25, purchaseCost: 6, hypeScore: 79 },
  { name: "Cloud Kiss Lip Duo", category: "makeup", originalPrice: 30, purchaseCost: 7, hypeScore: 83 },
  { name: "Petal Flush Cheek Stick", category: "makeup", originalPrice: 22, purchaseCost: 5, hypeScore: 72 },
  { name: "Halo Glow Highlighter", category: "makeup", originalPrice: 23, purchaseCost: 5, hypeScore: 74 },
  { name: "Serenity Skin Mist", category: "skincare", originalPrice: 28, purchaseCost: 6, hypeScore: 80 },
  { name: "Cloud Silk Cream", category: "skincare", originalPrice: 33, purchaseCost: 9, hypeScore: 88 },
  { name: "Aurora Lip Care Trio", category: "makeup", originalPrice: 25, purchaseCost: 6, hypeScore: 77 },
  { name: "Crystal Dew Serum", category: "skincare", originalPrice: 34, purchaseCost: 9, hypeScore: 90 },
  { name: "Midnight Glow Palette", category: "makeup", originalPrice: 27, purchaseCost: 6, hypeScore: 81 },
  { name: "Velvet Whip Lipstick", category: "makeup", originalPrice: 24, purchaseCost: 5, hypeScore: 75 },
  { name: "Petal Veil Setting Spray", category: "skincare", originalPrice: 29, purchaseCost: 7, hypeScore: 82 },
] as const;

const heroProducts: Product[] = heroItems.map((item, index) => ({
  id: `hero-${index + 1}`,
  name: item.name,
  brand: "BeautyVes",
  category: item.category,
  originalPrice: item.originalPrice,
  purchaseCost: item.purchaseCost,
  hypeScore: item.hypeScore,
  isBeautyVes: true,
  isLuxury: false,
  tier: "hero",
  imageUrl: getImage(item.category, index),
}));

const luxuryBrands = [
  "Chanelia",
  "DiorX",
  "Valentique",
  "Pradaire",
  "Maison Lumi",
  "YSLuxe",
  "Fendoria",
  "Guccielle",
];

const categories: Product["category"][] = ["makeup", "skincare", "perfume", "accessory"];

const luxuryPriceBands = [48, 56, 64, 72, 78, 86, 94, 102, 110, 118];

const luxuryProducts: Product[] = Array.from({ length: 50 }, (_, index) => {
  const category = categories[index % categories.length];
  const brand = luxuryBrands[index % luxuryBrands.length];
  const band = luxuryPriceBands[index % luxuryPriceBands.length];
  const premiumLift = Math.floor(index / luxuryPriceBands.length) * 3;
  const originalPrice = Math.min(120, band + premiumLift);
  const purchaseCost = Math.min(30, 5 + ((index * 4) % 26));
  const hypeScore = 55 + ((index * 5) % 40);

  return {
    id: `lux-${index + 1}`,
    name: `${brand} ${category === "perfume" ? "Essence" : "Luxe"} ${index + 1}`,
    brand,
    category,
    originalPrice,
    purchaseCost,
    hypeScore,
    isBeautyVes: false,
    isLuxury: true,
    tier: "premium",
    imageUrl: getImage(category, index + 4),
  };
});

const fillerBrands = [
  "GlowPop",
  "UrbanEase",
  "ColorJoy",
  "Freshdrop",
  "PureBeat",
  "NeonMuse",
];

const fillerProducts: Product[] = Array.from({ length: 50 }, (_, index) => {
  const category = categories[(index + 1) % categories.length];
  const brand = fillerBrands[index % fillerBrands.length];
  const originalPrice = 6 + ((index * 2) % 10) + ((index % 3) === 0 ? 1 : 0);
  const purchaseCost = 1 + (index % 4);
  const hypeScore = 25 + ((index * 3) % 35);

  return {
    id: `filler-${index + 1}`,
    name: `${brand} Daily ${category === "makeup" ? "Tint" : category === "skincare" ? "Care" : "Accessory"} ${index + 1}`,
    brand,
    category,
    originalPrice,
    purchaseCost,
    hypeScore,
    isBeautyVes: false,
    isLuxury: false,
    tier: "filler",
    imageUrl: getImage(category, index + 10),
  };
});

export const products: Product[] = [...heroProducts, ...luxuryProducts, ...fillerProducts];
