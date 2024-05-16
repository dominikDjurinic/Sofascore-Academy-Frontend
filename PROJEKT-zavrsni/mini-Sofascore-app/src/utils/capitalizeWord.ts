export const capitalize = (text: string) => {
  const capitalizedText = text[0].toUpperCase() + text.slice(1)

  return capitalizedText
}
