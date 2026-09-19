export interface SidebarItem {
  title: string
  icon: string
  link: string
}

export const sidebarItems: SidebarItem[] = [
  { title: 'Home',              icon: 'fa6-solid:house',                 link: '/' },
  { title: 'TSC',               icon: 'fa6-solid:clipboard-check',       link: '/tsc' },
  { title: 'Schools',           icon: 'fa6-solid:school',                link: '/schools' },
  { title: 'Workshops',         icon: 'fa6-solid:screwdriver-wrench',    link: '/workshops' },
  { title: 'Educational News',  icon: 'fa6-solid:newspaper',             link: '/educational-news' },
  { title: 'KNEC',              icon: 'fa6-solid:chalkboard-user',       link: '/knec' },
  { title: 'Leadership',        icon: 'fa6-solid:users',                 link: '/leadership' },
  { title: 'Politics',          icon: 'fa6-solid:landmark',              link: '/politics' },
  { title: 'Social',            icon: 'fa6-solid:comments',              link: '/social' },
  { title: 'About Author',          icon: 'fa6-solid:circle-info',           link: '/about' }
]
