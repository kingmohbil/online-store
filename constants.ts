interface LinkType {
  text: string;
  path: string;
}

export const websiteName: string = 'MR PERFUMES';

export const mainPageXMargins: {} = {
  mx: { xs: 1, sm: 6.5, md: 12.5, lg: 19, xl: 25 },
};

export const navItems: LinkType[] = [
  { text: 'Home', path: '/' },
  { text: 'Shop', path: '/shop' },
  { text: 'About', path: '/about' },
  { text: 'Contact', path: '/contact' },
];
