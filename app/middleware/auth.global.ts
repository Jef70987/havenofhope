export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path

  // Only guard the admin panel tree
  const adminRoot = '/author-panel-9f3a7b'
  if (!path.startsWith(adminRoot)) return

  // Public admin paths (no auth required)
  const publicAdmin = [
    adminRoot,              // login
    `${adminRoot}/forgot`,  // request reset
    `${adminRoot}/reset`,   // set new password
  ]
  if (publicAdmin.includes(path)) return

  // Already authenticated? Skip further checks for API or /me routes
  // Call /api/auth/me server-side so cookies are read from the request
  const { data } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie']),
  })

  // Not logged in → bounce to login
  if (!data.value || !(data.value as any).user) {
    return navigateTo(adminRoot)
  }

  // If password change is required, force them to /account
  const user = (data.value as any).user
  const mustChange = user?.must_change_password === true
  const isAccountPage = path === `${adminRoot}/account`

  if (mustChange && !isAccountPage) {
    return navigateTo(`${adminRoot}/account`)
  }
})
