import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import RegisterUser from './registerUser.vue'

function montar() {
  return mount(RegisterUser, {
    global: {
      plugins: [createTestingPinia({ stubActions: true, createSpy: vi.fn })],
    },
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
}

describe('registerUser.vue - reglas de validacion', () => {
  it('regla dni: rechaza un dni con formato invalido', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { dni: '1234' })
    await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('El DNI no es válido')
  })

  it('regla dni: acepta 8 numeros + 1 letra', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { dni: '12345678A' })
    await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).not.toContain('El DNI no es válido')
  })

  it('regla requiredCheckbox: exige aceptar los terminos', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper)
    // no marcamos el checkbox
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Debes aceptar los términos y condiciones')
  })

  it('regla de confirmacion de password: rechaza si no coincide con password', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { password: '12345678', confirmPassword: 'distinto1' })
    await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Las contraseñas no coinciden')
  })

  it('regla de confirmacion de password: pasa si coincide con password', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { password: '12345678', confirmPassword: '12345678' })
    await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).not.toContain('Las contraseñas no coinciden')
  })

  it('email con formato invalido: el mensaje generico de vee-validate se pisa por el texto en español', async () => {
    const wrapper = montar()

    await llenarCamposValidos(wrapper, { email: 'esto-no-es-un-correo' })
    await wrapper.find('input[name="aceptoTerminos"]').setValue(true)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Por favor, introduce un correo electrónico válido')
    expect(wrapper.text()).not.toContain('email is not valid.')
  })
})
