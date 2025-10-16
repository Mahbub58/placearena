import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.placearena.com'

  // Fetch all properties for dynamic sitemap
  let properties: any[] = []
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/property`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    if (res.ok) {
      properties = await res.json()
    }
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error)
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/add-property`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/saved`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Dynamic property pages
  const propertyPages: MetadataRoute.Sitemap = Array.isArray(properties)
    ? properties.map((property) => ({
        url: `${baseUrl}/property/${property._id}`,
        lastModified: new Date(property.updatedAt || property.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    : []

  return [...staticPages, ...propertyPages]
}
