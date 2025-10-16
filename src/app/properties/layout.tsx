import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Properties',
  description: 'Explore all available rental properties in Khulna. Filter by location, type, price range, and features. Find apartments, family homes, bachelor pads, shops, and offices.',
  keywords: ['properties Khulna', 'browse properties', 'rental listings', 'apartments Khulna', 'houses for rent'],
  openGraph: {
    title: 'Browse Properties in Khulna | PlaceArena',
    description: 'Explore all available rental properties in Khulna',
    type: 'website',
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
