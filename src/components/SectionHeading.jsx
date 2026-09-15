export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-red">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
    </div>
  )
}
