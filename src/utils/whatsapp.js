// Builds a WhatsApp deep link with a URL-encoded order message.
// Keeping this in one place avoids re-implementing encoding logic per screen.

export function buildWhatsAppOrderLink({ whatsappNumber, customer, items, branchName }) {
  const lines = []
  lines.push(`New order — ${branchName}`)
  lines.push('')
  items.forEach((item) => {
    lines.push(`${item.qty} x ${item.name}`)
  })
  lines.push('')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  if (customer.address) lines.push(`Address: ${customer.address}`)
  if (customer.notes) lines.push(`Notes: ${customer.notes}`)

  const message = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${whatsappNumber}?text=${message}`
}
