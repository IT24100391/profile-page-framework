import { Shield, MapPin, Clock, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

const jobs = [
  {
    title: "Security Officer",
    location: "Island Wide",
    type: "Full-time",
    qualifications: [
      "Age: 20-45 years",
      "Minimum 1 year security experience",
      "Physically fit (BMI within healthy range)",
      "Basic English communication",
    ],
    responsibilities: [
      "Patrol assigned premises and report irregularities",
      "Control access points and verify visitor credentials",
      "Maintain daily occurrence logs",
      "Respond to emergencies and coordinate with authorities",
    ],
  },
  {
    title: "Senior Security Officer",
    location: "Colombo & Suburbs",
    type: "Full-time",
    qualifications: [
      "Age: 25-50 years",
      "Minimum 5 years security experience",
      "Ex-military or police preferred",
      "Security management certification",
    ],
    responsibilities: [
      "Supervise security teams at designated sites",
      "Conduct risk assessments and security audits",
      "Train and mentor junior officers",
      "Liaise with clients on security requirements",
    ],
  },
  {
    title: "CCTV Operator",
    location: "Colombo HQ",
    type: "Shift-based",
    qualifications: [
      "Age: 22-40 years",
      "Experience in CCTV/surveillance systems",
      "Computer literacy required",
      "Attention to detail and alertness",
    ],
    responsibilities: [
      "Monitor CCTV feeds across multiple client locations",
      "Report suspicious activity in real-time",
      "Maintain surveillance logs and incident reports",
      "Coordinate with ground teams during incidents",
    ],
  },
  {
    title: "Industrial Guard",
    location: "Industrial Zones",
    type: "Full-time",
    qualifications: [
      "Age: 22-45 years",
      "Minimum 2 years in industrial security",
      "Knowledge of fire safety protocols",
      "Physical fitness certification",
    ],
    responsibilities: [
      "Secure industrial premises and warehouse areas",
      "Conduct vehicle and cargo inspections",
      "Enforce HSE (Health, Safety, Environment) policies",
      "Monitor fire alarms and emergency systems",
    ],
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Join Our Team</span>
          <h1 className="mt-2 text-4xl font-bold">Career Opportunities</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Build your career with one of the most respected security companies.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4">
          {jobs.map((job) => (
            <Card key={job.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                    </div>
                  </div>
                  <Button className="font-semibold">
                    <Briefcase className="mr-1 h-4 w-4" /> Apply Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Badge variant="outline" className="text-primary border-primary/30">Qualifications</Badge>
                    </h4>
                    <ul className="space-y-2">
                      {job.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Badge variant="outline" className="text-primary border-primary/30">Responsibilities</Badge>
                    </h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
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
