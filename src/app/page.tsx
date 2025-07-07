
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import RecentPosts from '@/components/RecentPosts'
import NewsletterSignup from '@/components/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Posts */}
      <FeaturedPosts />
      
      {/* Recent Posts */}
      <RecentPosts />
      
      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  )
}