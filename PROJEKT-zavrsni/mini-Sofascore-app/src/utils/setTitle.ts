export const setTitle = (slug: string) => {
  if (slug === 'football') {
    return `Football⚽ | Sofascore`
  } else if (slug === 'basketball') {
    return `Basketball🏀 | Sofascore`
  } else if (slug === 'american-football') {
    return `American-Football🏈 | Sofascore`
  } else {
    return ''
  }
}
