import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import RegisterUser from './registerUser.vue'

// registerError.vue tampoco tiene contexto propio (useField vive dentro del Form
// de registerUser.vue), lo probamos montado ahi igual que en produccion
function montar() {
  return mount(RegisterUser, {
    global: { plugins: [createTestingPinia({ stubActions: true, createSpy: vi.fn })] },
  })
}

async function llenarCamposValidos(wrapper, overrides = {}) {
  const valores = {
    name: 'Juan',
    lastName: 'Perez',
    dni: '12345678A',
    email: 'juan@example.com',
    password: '12345678',
    confirmPassword: '12345678',
    ...overrides,
  }
  await wrapper.find('#name').setValue(valores.name)
  await wrapper.find('#lastName').setValue(valores.lastName)
  await wrapper.find('#dni').setValue(valores.dni)
  await wrapper.find('#email').setValue(valores.email)
  await wrapper.find('#password').setValue(valores.password)
  await wrapper.find('#confirmPassword').setValue(valores.confirmPassword)
  await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
}

describe('registerError.vue', () => {
  it('no muestra nada cuando todos los campos son validos', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('pisa el mensaje generico de vee-validate por el texto en español del mapa (campo email)', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { email: 'no-es-un-correo' })
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Por favor, introduce un correo electrónico válido')
    expect(wrapper.text()).not.toContain('is not valid.')
  })

  it('deja pasar sin tocar un mensaje que la propia regla ya devuelve en español (dni)', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { dni: '123' })
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('El DNI no es válido')
  })
})
