// DreamAuthentics primary navigation — mirrors the original 3-level menu,
// with all web-store / checkout items removed. Product pages are kept as
// showcase pages (Request a Quote), not a live store.
export const nav = [
  {
    label: 'Custom Dream Home Arcades',
    href: '/arcades/',
    children: [
      {
        label: 'Arcade Cabinets',
        href: '/arcades/',
        children: [
          { label: 'Excalibur', href: '/arcades/excalibur/' },
          { label: 'Sting', href: '/arcades/sting/' },
          { label: 'Eladius', href: '/arcades/eladius/' },
          { label: 'Ultra Quad', href: '/arcades/ultra-quad/' },
          { label: 'Kiocade', href: '/arcades/kiocade/' },
          { label: 'Katana', href: '/arcades/katana/' },
          { label: 'MAME & Emulators', href: '/arcades/mame-emulators/' },
          { label: 'Gaming Pedestal', href: '/arcades/gaming-pedestal/' },
          { label: 'Racing Base', href: '/arcades/racing-base/' },
        ],
      },
      { label: 'Game List', href: '/game-list/' },
      { label: 'Design Art Portfolio', href: '/portfolio/' },
      { label: 'Game On! Book', href: 'https://www.amazon.com/Game-Things-Buying-Classic-Gaming-ebook/dp/B01BN3FLJ2', external: true },
    ],
  },
  {
    label: 'Controls',
    href: '/controls/',
    children: [
      {
        label: 'Custom Control Panels',
        href: '/controls/',
        children: [
          { label: 'Quad', href: '/controls/quad/' },
          { label: 'CO2', href: '/controls/co2/' },
          { label: 'Classic', href: '/controls/classic/' },
          { label: 'Solitaire', href: '/controls/solitaire/' },
        ],
      },
      {
        label: 'Arcade Parts',
        href: '/controls/#parts',
        children: [
          { label: 'Illuminated Joysticks', href: '/controls/illuminated-joysticks/' },
          { label: 'Tornado Spinner', href: '/controls/tornado-spinner/' },
        ],
      },
    ],
  },
  { label: 'Trade My Arcade!', href: '/trade-my-arcade/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Press & Media', href: '/press/' },
  {
    label: 'About Us',
    href: '/about/',
    children: [
      { label: 'Our Story', href: '/about/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Testimonials', href: '/testimonials/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
  { label: 'Request a Quote', href: '/contact/', cta: true },
];

export const asSeenOn = [
  { src: '/img/brand/g4logo.png', alt: 'G4 Tech TV' },
  { src: '/img/brand/Fox_logo.png', alt: 'FOX' },
  { src: '/img/brand/CBS_logo.png', alt: 'CBS' },
  { src: '/img/brand/playboytvlogo.png', alt: 'Playboy TV' },
  { src: '/img/brand/mtvlogo.png', alt: 'MTV' },
  { src: '/img/brand/gmalogo.png', alt: 'Good Morning America' },
];
