# bitcore-wallet-client

[![NPM Package](https://img.shields.io/npm/v/bitcore-wallet-client.svg?style=flat-square)](https://www.npmjs.org/package/bitcore-wallet-client)
[![Build Status](https://img.shields.io/travis/bitpay/bitcore-wallet-client.svg?branch=master&style=flat-square)](https://travis-ci.org/bitpay/bitcore-wallet-client)
[![Coverage Status](https://coveralls.io/repos/bitpay/bitcore-wallet-client/badge.svg)](https://coveralls.io/r/bitpay/bitcore-wallet-client)

The *official* client library for [bitcore-wallet-service](https://github.com/bitpay/bitcore-wallet-service).

## Description

This package communicates with BWS [Bitcore wallet service](https://github.com/bitpay/bitcore-wallet-service) using the REST API. All REST endpoints are wrapped as simple async methods. All relevant responses from BWS are checked independently by the peers, thus the importance of using this library when talking to a third party BWS instance.

See [Bitcore-wallet] (https://github.com/bitpay/bitcore-wallet) for a simple CLI wallet implementation that relays on BWS and uses bitcore-wallet-client.

## Get Started

You can start using bitcore-wallet-client via [NPM](https://www.npmjs.com/package/bitcore-wallet-client): by running `npm install bitcore-wallet-client` from your console.

## Example

Start your own local [Bitcore wallet service](https://github.com/bitpay/bitcore-wallet-service) instance. In this example we assume you have `bitcore-wallet-service` running on your `localhost:3232`.

Then create two files `irene.js` and `tomas.js` with the content below:

### **irene.js**

``` javascript
var Client = require('bitcore-wallet-client');


var fs = require('fs');
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api'

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: false,
});

client.createWallet("My Wallet", "Irene", 2, 2, {network: 'testnet'}, function(err, secret) {
  if (err) {
    console.log('error: ',err);
    return
  };
  // Handle err
  console.log('Wallet Created. Share this secret with your copayers: ' + secret);
  fs.writeFileSync('irene.dat', client.export());
});
```

### **tomas.js**

``` javascript

var Client = require('bitcore-wallet-client');


var fs = require('fs');
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api'

var secret = process.argv[2];
if (!secret) {
  console.log('./tomas.js <Secret>')

  process.exit(0);
}

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: false,
});

client.joinWallet(secret, "Tomas", {}, function(err, wallet) {
  if (err) {
    console.log('error: ', err);
    return
  };

  console.log('Joined ' + wallet.name + '!');
  fs.writeFileSync('tomas.dat', client.export());


  client.openWallet(function(err, ret) {
    if (err) {
      console.log('error: ', err);
      return
    };
    console.log('\n\n** Wallet Info', ret); //TODO

    console.log('\n\nCreating first address:', ret); //TODO
    if (ret.wallet.status == 'complete') {
      client.createAddress({}, function(err,addr){
        if (err) {
          console.log('error: ', err);
          return;
        };

        console.log('\nReturn:', addr)
      });
    }
  });
});
```

Install `bitcore-wallet-client` before start:

```sh
npm i bitcore-wallet-client
```

Create a new wallet with the first script:

```sh
$ node irene.js
info Generating new keys
 Wallet Created. Share this secret with your copayers: JbTDjtUkvWS4c3mgAtJf4zKyRGzdQzZacfx2S7gRqPLcbeAWaSDEnazFJF6mKbzBvY1ZRwZCbvT
```

Join to this wallet with generated secret:

```sh
$ node tomas.js JbTDjtUkvWS4c3mgAtJf4zKyRGzdQzZacfx2S7gRqPLcbeAWaSDEnazFJF6mKbzBvY1ZRwZCbvT
Joined My Wallet!

Wallet Info: [...]

Creating first address:

Return: [...]

```

Note that the scripts created two files named `irene.dat` and `tomas.dat`. With these files you can get status, generate addresses, create proposals, sign transactions, etc.The MIT License

Copyright (c) 2015-2021 BitPay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
