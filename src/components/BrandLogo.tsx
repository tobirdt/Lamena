import { ASSETS } from '../lib/site'

type BrandLogoProps = {
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function BrandLogo({ className, loading = 'lazy', fetchPriority = 'auto' }: BrandLogoProps) {
  return (
    <picture>
      <source srcSet={ASSETS.logo} type="image/webp" />
      <img
        className={className}
        src={ASSETS.logoFallback}
        alt="Lamena"
        width={286}
        height={80}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  )
}
