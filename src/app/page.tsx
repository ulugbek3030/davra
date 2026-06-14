import { VENUES } from "@/lib/venues";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalog venues={VENUES} />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
