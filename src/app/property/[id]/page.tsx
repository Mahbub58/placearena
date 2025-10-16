import PropertyDetail from "./PropertyDetail";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/property/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        title: "Property Not Found",
      };
    }

    const property = await res.json();

    const imageUrl = property.images?.[0] || "/banner.jpg";
    const rent = property.rent ? `৳${property.rent}/month` : "";

    return {
      title: `${property.title} - ${property.location}`,
      description: `${property.type} for rent in ${property.location}, Khulna. ${rent}. ${property.rooms} rooms, ${property.bathrooms} bathrooms. ${property.description?.substring(0, 150) || ""}`,
      keywords: [
        property.title,
        property.location,
        property.type,
        "Khulna",
        "rent",
        "property",
        ...property.features || []
      ],
      openGraph: {
        title: `${property.title} - ${property.location}`,
        description: `${property.type} for rent in ${property.location}. ${rent}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: property.title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${property.title} - ${property.location}`,
        description: `${property.type} for rent. ${rent}`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Property Details",
    };
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.BACKEND_URL}/property/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch property data");
  }
  const property = await res.json();

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://www.placearena.com/property/${id}`,
    "image": property.images || [],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressRegion": "Khulna",
      "addressCountry": "BD"
    },
    "offers": {
      "@type": "Offer",
      "price": property.rent,
      "priceCurrency": "BDT",
      "availability": "https://schema.org/InStock"
    },
    "numberOfRooms": property.rooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitText": "sq ft"
    },
    "amenityFeature": property.features?.map((feature: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": feature
    })) || []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetail property={property} />
    </>
  );
}
