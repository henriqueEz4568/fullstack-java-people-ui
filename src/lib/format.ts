const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  maximumFractionDigits: 1,
})

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPercent(value: number) {
  return percentFormatter.format(value)
}

export function countryFlag(countryCode: string) {
  return String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map((char) => char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET),
  )
}
