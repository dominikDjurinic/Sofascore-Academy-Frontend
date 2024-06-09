export const favouritesDate = (date: string) => {
  let tomorrow: Date = new Date()
  tomorrow.setDate(new Date().getDate() + 1)

  if (
    (new Date(date).getDate() === new Date().getDate() && new Date(date).getMonth() === new Date().getMonth()) ||
    (new Date(date).getDate() === new Date(tomorrow).getDate() &&
      new Date(date).getMonth() === new Date(tomorrow).getMonth())
  ) {
    return 'currentFavouritesMiniSofa'
  } else if (new Date(date) > tomorrow) {
    return 'nextFavouritesMiniSofa'
  } else {
    return 'previousFavouritesMiniSofa'
  }
}
