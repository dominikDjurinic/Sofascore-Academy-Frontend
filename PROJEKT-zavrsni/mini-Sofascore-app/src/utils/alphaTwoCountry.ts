import countries from '../../public/countries.json'

export const alpha2Country = (country: string) => {
  const alpha2 = countries.find(({ name }) => name === country)

  return alpha2?.code.toLowerCase()
}
