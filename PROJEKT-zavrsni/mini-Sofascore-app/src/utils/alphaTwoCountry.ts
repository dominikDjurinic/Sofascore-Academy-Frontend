import countries from '../../public/countries.json'

export const alpha2Country = (country: string) => {
  //funkcija pretrazuje countries.json te vraca alpha2 code za prikaz slika zemlaja
  const alpha2 = countries.find(({ name }) => name === country)

  return alpha2?.code.toLowerCase()
}
