import { Link } from "react-router-dom";
import { Shield, Eye, Users, Lock, Camera, UserCheck, Factory, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef, useState } from "react";
import { allClients } from "@/data/clientsData";

const services = [
  { icon: Users, title: "Manned Guarding", desc: "Trained security personnel for commercial, residential, and industrial premises." },
  { icon: Camera, title: "CCTV Surveillance", desc: "24/7 monitoring with state-of-the-art surveillance technology." },
  { icon: Shield, title: "Event Security", desc: "Comprehensive event security management for all scales." },
  { icon: UserCheck, title: "VIP Protection", desc: "Close protection services for high-profile individuals." },
  { icon: Factory, title: "Industrial Security", desc: "Specialized security for factories, warehouses, and industrial zones." },
  { icon: Lock, title: "Access Control", desc: "Modern access management systems and security protocols." },
];

const stats = [
  { value: "9+", label: "YEARS EXPERIENCE", gold: true },
  { value: "500+", label: "PERSONNEL", gold: false },
  { value: "50+", label: "CLIENTS", gold: false },
  { value: "24/7", label: "MONITORING", gold: true },
];

const team = [
  { name: "Col. Rajitha Perera", role: "Managing Director", desc: "35+ years military experience" },
  { name: "Maj. Sanath Fernando", role: "Operations Director", desc: "25+ years in security operations" },
  { name: "Capt. Nimal Silva", role: "Training Commander", desc: "Combat & tactical training specialist" },
  { name: "Ms. Ayesha Wijesinghe", role: "HR Director", desc: "15+ years in HR & compliance" },
];

const testimonials = [
  { quote: "Stallion Security has transformed our site protection. Their professionalism is unmatched.", author: "John De Silva", company: "ABC Industries" },
  { quote: "The best security partner we've ever worked with. Highly reliable and responsive.", author: "Priya Jayawardena", company: "Lanka Hotels Group" },
  { quote: "Their CCTV monitoring service has prevented multiple incidents. Exceptional service.", author: "Mark Ranatunga", company: "Pacific Exports" },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const num = parseInt(target.replace(/\D/g, ""));
  const nonNum = target.replace(/\d/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(num / 40));
          const interval = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(interval); }
            else setCount(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return <div ref={ref}>{count}{nonNum}{suffix}</div>;
}

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Security team" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Shield className="h-4 w-4" /> TRUSTED PROTECTION
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
            World Class{" "}
            <span className="text-primary">Security Solutions</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Led by elite ex-military professionals with over 9 years of experience,
            providing comprehensive commercial, industrial and event security services.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/inquiries">
              <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-base px-8">
                Get a Quote
              </Button>
            </Link>
            <a href="#services">
              <Button size="lg" variant="outline" className="border-primary/50 font-semibold text-primary hover:bg-primary/10 text-base px-8">
                View Services
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-card p-6 shadow-lg md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl font-extrabold md:text-4xl ${s.gold ? "text-primary" : "text-foreground"}`}>
                  <AnimatedCounter target={s.value} />
                </div>
                <div className="mt-1 text-xs font-medium tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">What We Offer</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Our Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-y border-border bg-secondary/30 py-20">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">About Us</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Stallion Security</h2>
            <p className="mt-4 text-muted-foreground">
              Stallion Security is a premier security services provider founded by experienced
              ex-military professionals. We deliver comprehensive, reliable, and innovative
              security solutions tailored to meet the unique needs of our diverse clientele.
            </p>
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="vision">
                <AccordionTrigger className="text-sm font-semibold">Our Vision</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  To be the most trusted and respected security services provider, setting the
                  industry standard for excellence, innovation, and integrity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mission">
                <AccordionTrigger className="text-sm font-semibold">Our Mission</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  To protect our clients' people, property, and assets through highly trained
                  professionals, cutting-edge technology, and unwavering commitment to service excellence.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full overflow-hidden rounded-xl bg-muted">
              <img src={heroBg} alt="About Stallion Security" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-lg bg-primary px-4 py-2">
                <span className="text-lg font-bold text-primary-foreground">9+ Years</span>
                <span className="ml-1 text-sm text-primary-foreground/80">of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Our Team</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Card key={m.name} className="text-center transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserCheck className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto mb-4 h-10 w-10 text-primary/30" />
            <p className="text-lg italic text-muted-foreground">
              "{testimonials[testimonialIdx].quote}"
            </p>
            <p className="mt-4 font-semibold">{testimonials[testimonialIdx].author}</p>
            <p className="text-sm text-primary">{testimonials[testimonialIdx].company}</p>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Clientele</span>
            <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">Trusted by {allClients.length}+ Organizations</h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {allClients.slice(0, 5).map((name) => (
              <div key={name} className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm">
                <Lock className="h-3.5 w-3.5 text-primary" />
                {name}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/clients">
              <Button variant="outline" className="border-primary/50 text-primary font-semibold hover:bg-primary/10">
                Show More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Secure Your Business?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/70">
            Contact us today for a free security assessment and customized solutions.
          </p>
          <Link to="/inquiries">
            <Button size="lg" className="mt-6 bg-background text-foreground font-bold hover:bg-background/90 text-base px-8">
              Contact Us <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
