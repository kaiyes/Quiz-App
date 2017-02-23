

  Cloudinary.config({
    cloud_name: 'jahanara',
    api_key: '546448433889532',
    api_secret: 'O2OXTDPOSmJZOZecrPYsxh9KVT0'
  });


    // Push.debug = true;

    Push.Configure({
      apn: {
        // certData: Assets.getText('eddieCert.pem'),
        // keyData: Assets.getText('eddieKey.pem'),
        certData: Assets.getText('eddieCertProd.pem'),
        keyData: Assets.getText('eddieKeyProd.pem'),
        passphrase: '84pk8uu3',
        production: true,
        // gateway: 'gateway.sandbox.push.apple.com',
        gateway: 'gateway.push.apple.com',
      },
      gcm: {
         apiKey: 'AAAAltHR2fQ:APA91bFN_lyKf8i0_stc0fIfRYEdqeOlQsiAzzxV-lrg0EeJFMp3n1QCWuwCYmlofLAY7ebmB5YR3jcTqhzzmPFJQs3syDWLJWSykoe_8Hmq-YEYjeGaAVdz5K2CJxguEQgzj5e00xzj',
         projectNumber:"eddie-9fadb"
       }
    });
