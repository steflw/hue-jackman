const location = [{
  confidence: 0.85,
  value: 'Living Room'
}];


export const messageResponse = {
  entry: [{
    id: '123456789',
    messaging: [
      {
        message: {
          mid: 'mid.sdofjlsdfjsdhgjdf',
          seq: 329720,
          text: 'Turn off the living room lights',
          nlp: {
            entities: {
              intent: [{
                confidence: 0.85,
                value: 'on_off'
              }],
              on_off: [{
                confidence: 0.85,
                value: 'off'
              }],
              location: [{
                confidence: 0.85,
                value: 'Living Room'
              }]
            }
          }
        },
        recipient: {
          id: '1234567891123543'
        },
        sender: {
          id: '12345'
        },
        timestamp: 1514487053144
      }
    ]
  }]
};

export const messageEvent = messageResponse.entry[0].messaging[0];

export const entities = {
  intent: [{
    value: 'on_off'
  }],
  on_off: [{
    value: 'off'
  }],
  location
};

export const lowConfidenceEntity = {
  intent: [{
    confidence: 0.85,
    value: 'on_off'
  }],
  on_off: [{
    confidence: 0.75,
    value: 'switch'
  }],
  location
};

export const unexpectedIntent = {
  intent: [{
    confidence: 0.85,
    value: 'SomethingUnexpected'
  }],
  SomethingUnexpected: [{
    value: 'sdfsfdsdf',
    confidence: 0.8
  }],
  location
};

export const lowConfidenceIntent = {
  entities: {
    intent: [{
      confidence: 0.79,
      value: 'on_off'
    }]
  }
};

export const expectedEntities = {
  on_off: {
    intent: [{
      confidence: 0.85,
      value: 'on_off'
    }],
    on_off: [{
      confidence: 0.85,
      value: 'on'
    }],
    location,
    response: `Turning on the ${location[0].value} lights`
  },
  colour: {
    intent: [{
      confidence: 0.85,
      value: 'colour'
    }],
    colour: [{
      confidence: 0.85,
      value: 'Red'
    }],
    location,
    response: `Changing the colour of the ${location[0].value} lights to Red`
  },
  brightness: {
    intent: [{
      confidence: 0.85,
      value: 'brightness'
    }],
    brightness: [{
      confidence: 0.85,
      value: '42%'
    }],
    location,
    response: `Setting the ${location[0].value} lights to 42% brightness`
  }
};

