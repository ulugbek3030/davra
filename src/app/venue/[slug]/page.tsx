import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVenue, VENUES } from "@/lib/venues";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VenueDetailActions } from "@/components/VenueDetailActions";
import { VenueDetailBody } from "@/components/VenueDetailBody";

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenue(slug);
  if (!v) return { title: "Davra" };
  return {
    title: v.name,
    description: `${v.tagline} · ${v.district}, Toshkent · ${v.rating}★`,
    openGraph: { title: `${v.name} · Davra`, description: v.tagline },
  };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = getVenue(slug);
  if (!venue) notFound();

  return (
    <>
      <Navbar />
      <VenueDetailBody venue={venue} />
      <VenueDetailActions venue={venue} />
      <Footer />
    </>
  );
}
