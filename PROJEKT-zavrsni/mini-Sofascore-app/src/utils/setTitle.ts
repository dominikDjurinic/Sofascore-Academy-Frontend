export const setTitle = (slug: string) => {
  if (slug === 'football') {
    return `Football⚽ | Sofascore`
  } else if (slug === 'basketball') {
    return `Basketball🏀 | Sofascore`
  } else {
    return `American-Football🏈 | Sofascore`
  }
}
