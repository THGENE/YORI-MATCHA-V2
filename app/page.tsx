import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RangesSection } from "@/components/ranges-section"
import { ProductsSection } from "@/components/product-detail"
import { PacksSection } from "@/components/packs-section"
import { AboutSection } from "@/components/about-section"
import { TerroirSection } from "@/components/terroir-section"
import { AccessoriesSection } from "@/components/accessories-section"
import { BlogSection } from "@/components/blog-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <main className="bg-background text-foreground overflow-x-hidden">
        <HeroSection />
        <Navbar />
        <RangesSection />
        <PacksSection />
        <ProductsSection />
        <AboutSection />
        <TerroirSection />
        <AccessoriesSection />
        <BlogSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
