export const formatName = (home: string | undefined, away: string | undefined) => {
  if (home !== undefined && away !== undefined) {
    const formatHome = home.toLowerCase().replace(' ', '-')
    const formatAway = away.toLowerCase().replace(' ', '-')
    const allTogether = formatHome + ' ' + formatAway
    return allTogether.replace(' ', '-')
  } else {
    return ''
  }
}
