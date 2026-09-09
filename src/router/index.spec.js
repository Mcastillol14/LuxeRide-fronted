import { describe, it, expect } from 'vitest'
import router from './index'

describe('router', () => {
  it('resuelve "/" a la ruta Index con indexWeb.vue', async () => {
    const resuelta = router.resolve('/')
    expect(resuelta.name).toBe('Index')
    expect(resuelta.matched.length).toBeGreaterThan(0)
  })

  it('resuelve "/home" a la ruta Home con userWeb.vue', async () => {
    const resuelta = router.resolve('/home')
    expect(resuelta.name).toBe('Home')
    expect(resuelta.matched.length).toBeGreaterThan(0)
  })
})
