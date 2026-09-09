import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import LoginUser from './loginUser.vue'

// router minimo solo con lo que el componente necesita (push a /home al loguear bien)
function crearRouterTest() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Index', component: { template: '<div />' } },
      { path: '/home', name: 'Home', component: { template: '<div />' } },
    ],
  })
}

async function montar() {
  const router = crearRouterTest()
  router.push('/')
  await router.isReady()

  const wrapper = mount(LoginUser, {
    global: {
      plugins: [createTestingPinia({ stubActions: true, createSpy: vi.fn }), router],
    },
  })
  return { wrapper, router }
}

describe('loginUser.vue - regla required', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra "Este campo es obligatorio" cuando se envia el form vacio', async () => {
    const { wrapper } = await montar()

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    const errores = wrapper.findAll('.error').map((e) => e.text())
    expect(errores).toContain('Este campo es obligatorio')
  })

  it('no muestra error cuando los campos son validos', async () => {
    const { wrapper } = await montar()

    await wrapper.find('#email').setValue('user@example.com')
    await wrapper.find('#passwordLogin').setValue('12345678')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    const errores = wrapper.findAll('.error').filter((e) => e.text().length > 0)
    expect(errores).toHaveLength(0)
  })

  it('email con formato invalido cae en el mensaje generico de vee-validate (loginError no tiene override)', async () => {
    const { wrapper } = await montar()

    await wrapper.find('#email').setValue('esto-no-es-un-correo')
    await wrapper.find('#passwordLogin').setValue('12345678')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    const errores = wrapper.findAll('.error').map((e) => e.text())
    expect(errores).toContain('email is not valid.')
  })
})
