import { callThreadApi } from './api';

export const persistentMenu = () =>
  callThreadApi({
    persistent_menu: [{
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          title: 'List My Light Groups',
          type: 'postback',
          payload: 'LIST_LIGHT_GROUPS'
        }
        // {
        //   title: 'test',
        //   type: 'nested',
        //   call_to_actions:[{
        //     title: 'another test',
        //     type: 'postback',
        //     payload: 'TEST_PAYLOAD'
        //   }]
        // },
        // {
        //   title: 'test',
        //   type: 'nested',
        //   call_to_actions:[{
        //     title: 'another test',
        //     type: 'postback',
        //     payload: 'TEST_PAYLOAD'
        //   }]
        // }
      ]
    }]
  });
