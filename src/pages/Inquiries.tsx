import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

export default function Inquiries() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
          <h1 className="mt-2 text-4xl font-bold">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Have a question or need a security assessment? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-semibold">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="services">Service Inquiry</SelectItem>
                      <SelectItem value="careers">Career Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="sm:col-span-2">
                    <Textarea placeholder="Your Message" className="min-h-[120px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="font-semibold">
                      <Send className="mr-1 h-4 w-4" /> Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Contact Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">No. 42, Security Avenue, Colombo 07, Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">+94 11 234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">info@stallionsecurity.lk</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Business Hours
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Monday - Friday</span><span className="font-medium text-foreground">8:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-foreground">8:00 AM - 1:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-destructive">Closed</span></div>
                  <p className="mt-2 text-xs">24/7 Emergency Line: +94 77 123 4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Our Location</h3>
                <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-5 w-5" /> Map Placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
