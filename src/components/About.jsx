import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="bg-brand-cream py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <SectionHeading eyebrow="Our Story" title="About Max Pizza Hub" />
        <p className="mt-4 text-gray-600">
          {/* ⚠️ Placeholder copy — replace with the client's actual story once provided. */}
          Max Pizza Hub is a local favorite serving fresh pizza, burgers, sandwiches and more.
          Final about-us content is pending client input.
        </p>
      </div>
    </section>
  )
}
