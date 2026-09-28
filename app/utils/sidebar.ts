export interface SidebarItem {
  title: string
  icon: string
  link: string
}

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Home',
    icon: 'fa6-solid:house',
    link: '/'
  },
  {
    title: 'Words of Hope',
    icon: 'fa6-solid:book-open',
    link: '/words-of-hope'
  },
  {
    title: 'Prayers',
    icon: 'fa6-solid:hands-praying',
    link: '/prayers'
  },
  // {
  //   title: 'Worship',
  //   icon: 'fa6-solid:music',
  //   link: '/worship'
  // },
  // {
  //   title: 'Community',
  //   icon: 'fa6-solid:comments',
  //   link: '/community'
  // },
  // {
  //   title: 'About Us',
  //   icon: 'fa6-solid:circle-info',
  //   link: '/about'
  // }
]
