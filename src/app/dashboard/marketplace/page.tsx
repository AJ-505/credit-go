import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Assuming this exists, fallback to simple div if not

const products = [
  { id: 1, name: 'MacBook Air 13" M2 (2022)', specs: '8GB/256GB', price: 1500000, minTier: 'Silver', category: 'Laptops' },
  { id: 2, name: 'MacBook Pro 14" M4 (2024)', specs: '18GB/512GB', price: 2700000, minTier: 'Gold', category: 'Laptops' },
  { id: 3, name: 'iPhone 16 Pro Max 256GB', specs: 'A18 Pro/8GB', price: 2100000, minTier: 'Gold', category: 'Phones' },
  { id: 4, name: 'Samsung Galaxy S25 Ultra', specs: 'Snapdragon/16GB', price: 1000000, minTier: 'Silver', category: 'Phones' },
  { id: 5, name: 'Mercury 3.5kVA Solar Kit', specs: '5kWh LiFePO4', price: 3400000, minTier: 'Gold', category: 'Solar' },
  { id: 6, name: 'LG 43" 4K Smart TV', specs: '43 inch', price: 450000, minTier: 'Bronze', category: 'Appliances' },
];

export default function MarketplacePage() {
  const userTier = 'Gold';
  const safeLimit = 3200000;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">Browse financing options based on your tier and limit.</p>
      </div>

      <div className="flex gap-4 border-b pb-2 overflow-x-auto">
        {['All', 'Laptops', 'Phones', 'Solar', 'Appliances'].map(cat => (
          <button key={cat} className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => {
          const qualifies = p.minTier === 'Bronze' || p.minTier === 'Silver' || (p.minTier === 'Gold' && userTier === 'Gold');
          const withinLimit = p.price <= safeLimit;
          
          return (
            <div key={p.id} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image Placeholder</span>
              </div>
              <div className="p-6 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.specs}</p>
                <div className="mt-2 text-xl font-bold">₦{p.price.toLocaleString()}</div>
                
                <div className="flex gap-2 mt-2">
                  {qualifies ? (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-transparent">
                      You qualify
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 border-transparent">
                      Need {p.minTier} tier
                    </span>
                  )}
                  {!withinLimit && (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border-transparent">
                      Above Limit
                    </span>
                  )}
                </div>
                
                <div className="mt-auto pt-4">
                  <Link href={`/dashboard/marketplace/${p.id}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
