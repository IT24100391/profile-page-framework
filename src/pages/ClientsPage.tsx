import { Building2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

const clients = [
  { name: "ABC Industries", sector: "Manufacturing", years: "5+ years" },
  { name: "Lanka Hotels Group", sector: "Hospitality", years: "3+ years" },
  { name: "Pacific Exports", sector: "Logistics", years: "4+ years" },
  { name: "Metro Bank PLC", sector: "Banking & Finance", years: "6+ years" },
  { name: "TechCorp Solutions", sector: "Technology", years: "2+ years" },
  { name: "SkyLine Properties", sector: "Real Estate", years: "3+ years" },
  { name: "Green Valley Resorts", sector: "Tourism", years: "4+ years" },
  { name: "National Warehouse Co.", sector: "Warehousing", years: "5+ years" },
  { name: "Prime Retail Chain", sector: "Retail", years: "3+ years" },
  { name: "Island Pharma Ltd", sector: "Healthcare", years: "2+ years" },
  { name: "Diamond Apparels", sector: "Garments", years: "4+ years" },
  { name: "Oceanic Fisheries", sector: "Marine", years: "3+ years" },
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Partners</span>
          <h1 className="mt-2 text-4xl font-bold">Trusted Clients</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            We are proud to serve some of the most respected organizations across multiple industries.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((c) => (
            <Card key={c.name} className="transition-shadow hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.sector}</p>
                  <p className="mt-1 text-xs text-primary">{c.years}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
