import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property',
  description: 'List your property for rent in Khulna. Reach thousands of potential tenants. Easy listing process, verified platform, no hidden fees.',
  keywords: ['list property', 'add property', 'property owner', 'rent out property', 'landlord'],
  openGraph: {
    title: 'List Your Property for Rent | PlaceArena',
    description: 'List your property and reach thousands of tenants in Khulna',
    type: 'website',
  },
};

export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
