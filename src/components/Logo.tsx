/** SEAMUNs logo — uses logo.png from public/ */
export default function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="SEAMUNs"
      className={className}
      fetchPriority="high"
    />
  )
}
