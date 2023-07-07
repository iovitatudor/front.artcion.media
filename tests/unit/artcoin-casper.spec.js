import {shallowMount} from '@vue/test-utils'
import LoginComponent from "@/components/LoginComponent.vue";
import PaymentGenerator from "@/components/PymentGeneratorComponent.vue";

describe('LoginComponent', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(LoginComponent)
    let button = wrapper.find('.main-section-inside v-btn')
    expect(button.exists()).toBe(true)
  })
})

describe('LoginComponent', () => {
  it('check text content to be as defined in variable', () => {
    const wrapper = shallowMount(LoginComponent, {
      data() {
        return {
          isLogged: false,
          setPublicKey: null,
          provider: {},
          messages: {
            installChrome: false,
          }
        }
      }
    })
    let btnText = wrapper.find('.main-section-inside v-btn')
    expect(btnText.text()).toBe('Login with Casper')
  })
})

describe('LoginComponent', () => {
  it('renders inner text', () => {
    const wrapper = shallowMount(LoginComponent);
    expect(wrapper.text()).toContain('Login');
  });
});

describe('LoginComponent', () => {
  it('renders logged list of users',  () => {
    const users = []
    const wrapper = shallowMount(LoginComponent, {
      setup() {
        return{
          users
        };
      },
    });

    const listsOfUsers =  wrapper.findAllComponents(LoginComponent);
    expect((listsOfUsers).length).toEqual(users.length)
  })
})

describe('PaymentGenerator', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(PaymentGenerator)
    let input = wrapper.find('.wallet-recipient input')
    expect(input.exists()).toBe(true)
  })
})

describe('PaymentGenerator', () => {
  it('check text content to be as defined in variable', () => {
    const wrapper = shallowMount(PaymentGenerator, {
      data() {
        return {
          snackbar: false,
          total: '',
          link: null,
        }
      }
    })
    let btnText = wrapper.find('.wallet-buttons v-btn')
    expect(btnText.text()).toBe('Generate')
  })
})

describe('PaymentGenerator', () => {
  it('renders inner text', () => {
    const wrapper = shallowMount(PaymentGenerator);
    expect(wrapper.text()).toContain('Total (AC)');
  });
});

describe('PaymentGenerator', () => {
  it('renders list of users',  () => {
    const users = []
    const wrapper = shallowMount(PaymentGenerator, {
      setup() {
        return{
          users
        };
      },
    });

    const listsOfUsers =  wrapper.findAllComponents(PaymentGenerator);
    expect((listsOfUsers).length).toEqual(users.length)
  })
})