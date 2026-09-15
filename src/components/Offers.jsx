import SectionHeading from './SectionHeading'

// ⚠️ No offers have been approved/verified yet — placeholders only,
// do not launch without confirming with the client.
const offers = [
  { id: 1, title: 'Offer details pending client confirmation', description: '' },
]

export default function Offers() {
  return (
    <section id="offers" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Deals" title="Current Offers" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500"
          >
            {offer.title}
          </div>
        ))}
      </div>
    </section>
  )
}
