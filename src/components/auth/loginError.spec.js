import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import LoginUser from './loginUser.vue'

// loginError.vue no tiene contexto propio (usa useField dentro del Form de loginUser.vue),
// asi que lo probamos montado dentro del form real, igual que en produccion
async function montar() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Index', component: { template: '<div />' } },
      { path: '/home', name: 'Home', component: { template: '<div />' } },
    ],
  })
  router.push('/')
  await router.isReady()

  return mount(LoginUser, {
    global: { plugins: [createTestingPinia({ stubActions: true, createSpy: vi.fn }), router] },
  })
}

describe('loginError.vue', () => {
  it('no muestra nada cuando el campo es valido', async () => {
    const wrapper = await montar()

    await wrapper.find('#email').setValue('user@example.com')
    await wrapper.find('#passwordLogin').setValue('12345678')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('como el mapa de mensajes esta vacio, deja pasar el texto generico de vee-validate tal cual', async () => {
    const wrapper = await montar()

    await wrapper.find('#email').setValue('no-es-un-correo')
    await wrapper.find('#passwordLogin').setValue('12345678')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('email is not valid.')
  })
})
