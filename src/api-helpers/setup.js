import { callThreadApi } from './api'

export const persistentMenu = () => {
  callThreadApi({
    persistent_menu: [{
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          title: 'test',
          type: 'nested',
          call_to_actions:[{
            title: 'another test',
            type: 'postback',
            payload: 'TEST_PAYLOAD'
          }]
        },
        {
          title: 'test',
          type: 'nested',
          call_to_actions:[{
            title: 'another test',
            type: 'postback',
            payload: 'TEST_PAYLOAD'
          }]
        },
        {
          title: 'test',
          type: 'nested',
          call_to_actions:[{
            title: 'another test',
            type: 'postback',
            payload: 'TEST_PAYLOAD'
          }]
        }
      ]
    }]
  })
}

export const getStarted = () => {
  callThreadApi({
    get_started:{
      payload: 'get started'
    }
  })
}

export default {
  persistentMenu,
  getStarted
}
