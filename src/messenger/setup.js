import { callThreadApi } from './api';

const persistentMenu = () =>
  callThreadApi({
    persistent_menu: [{
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          title: 'List My Light Groups',
          type: 'postback',
          payload: 'LIST_LIGHT_GROUPS'
        },
        {
          title: 'Quick Actions',
          type: 'nested',
          call_to_actions:[{
            title: 'Toggle Living Room',
            type: 'postback',
            payload: 'TOGGLE_LIVING_ROOM'
          },
        {
            title: 'Toggle Island',
            type: 'postback',
            payload: 'TOGGLE_ISLAND'
          }]
        },
        // {
        //   title: 'Quick Actions',
        //   type: 'nested',
        //   call_to_actions:[{
        //     title: 'Toggle Living Room',
        //     type: 'postback',
        //     payload: 'TOGGLE_LIVING_ROOM'
        //   },
        // {
        //     title: 'Toggle Island',
        //     type: 'postback',
        //     payload: 'TOGGLE_ISLAND'
        //   }]
        // },
      ]
    }]
  });

export default {
  persistentMenu
}
