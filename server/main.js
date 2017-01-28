

  Cloudinary.config({
    cloud_name: 'jahanara',
    api_key: '546448433889532',
    api_secret: 'O2OXTDPOSmJZOZecrPYsxh9KVT0'
  });



    Push.Configure({
      apn: {
        certData: Assets.getText('PushChatCert.pem'),
        keyData: Assets.getText('PushChatKey.pem'),
        passphrase: 'eddie',
        production: false,
        gateway: 'gateway.push.apple.com',
      },
      // gcm: {
      //   apiKey: 'xxxxxxx',
      // }

    });
