import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { datosStore } from './loginUser'

vi.mock('axios')

describe('store login (loginUser.js)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('guarda el usuario y limpia error/cargando cuando la llamada funciona', async () => {
    const respuestaFake = { data: { id: 1, nombre: 'Juan' } }
    axios.post.mockResolvedValueOnce(respuestaFake)

    const store = datosStore()
    await store.loginUsuario({ email: 'a@a.com', password: '12345678' })

    expect(store.usuario).toEqual(respuestaFake.data)
    expect(store.error).toBeNull()
    expect(store.cargando).toBe(false)
  })

  it('guarda error.response.data cuando el backend responde con error', async () => {
    const errorFake = { response: { data: 'Credenciales invalidas' } }
    axios.post.mockRejectedValueOnce(errorFake)

    const store = datosStore()
    await expect(
      store.loginUsuario({ email: 'a@a.com', password: 'mal' })
    ).rejects.toEqual(errorFake)

    expect(store.error).toBe('Credenciales invalidas')
    expect(store.cargando).toBe(false)
  })

  it('guarda error.message cuando no hay response (ej. error de red)', async () => {
    const errorFake = new Error('Network Error')
    axios.post.mockRejectedValueOnce(errorFake)

    const store = datosStore()
    await expect(
      store.loginUsuario({ email: 'a@a.com', password: 'mal' })
    ).rejects.toThrow('Network Error')

    expect(store.error).toBe('Network Error')
    expect(store.cargando).toBe(false)
  })

  it('llama a axios.post con la url del endpoint de login', async () => {
    axios.post.mockResolvedValueOnce({ data: {} })
    const store = datosStore()

    await store.loginUsuario({ email: 'a@a.com', password: '12345678' })

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post.mock.calls[0][0]).toContain('/api/usuarios/iniciar')
  })
})
