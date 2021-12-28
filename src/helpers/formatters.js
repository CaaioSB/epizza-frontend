export const limitString = (string, limit) => {
  if (!limit || !string || string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit).trim()}...`
}

export const formatMoneyFromPTBR = quantity => {
  if (typeof quantity !== 'string') {
    throw Error('formatMoneyPTBR expect string on parameter')
  }

  return parseFloat(quantity.replace('.', '').replace(',', '.'))
}
