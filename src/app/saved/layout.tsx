import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Properties',
  description: 'View your saved and favorite properties. Keep track of properties you are interested in renting in Khulna.',
  openGraph: {
    title: 'Saved Properties | PlaceArena',
    description: 'Your favorite properties in one place',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
