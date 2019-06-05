import ds from 'deepstream.io-client-js';
/*
  {
    user: 'Pitpy',
    password: 'Pitpy@#bceL'
  }
*/
export default ds('ws://10.0.10.40:6020/bcelconnect').login({
  user: 'Pitpy',
  password: 'Pitpy@#bceL'
  }, () => {
    console.log('Login to deepstream successfully')
  });