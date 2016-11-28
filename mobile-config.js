App.info({
  id: 'com.example.ivive.eddie',
  name: 'Eddie',
  author: 'Ivive Labs',
  email: 'hello@ivivelabs.com',
  website: 'https://www.ivivelabs.com/'
});

App.accessRule('http://*');
App.accessRule('https://*');

App.appendToConfig(`
  <universal-links>
    <host name="http://eddie.meteorapp.com" />
  </universal-links>
`);
