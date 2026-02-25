import { Lock } from "lucide-react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import { allClients } from "@/data/clientsData";

export default function ClientsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Clientele</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Trusted by {allClients.length}+ Organizations</h1>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary" />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {allClients.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <Lock className="h-3.5 w-3.5 text-primary" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
