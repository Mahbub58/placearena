import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your PlaceArena account, view your property listings, update profile information, and track your rental activities.',
  openGraph: {
    title: 'My Profile | PlaceArena',
    description: 'Manage your account and property listings',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
