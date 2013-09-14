# aperçu

[![Build Status](https://travis-ci.org/zuzak/apercu.png?branch=master)](https://travis-ci.org/zuzak/apercu)
[![Dependency Status](https://gemnasium.com/zuzak/apercu.png)](https://gemnasium.com/zuzak/apercu)
[![Coverage Status](https://coveralls.io/repos/zuzak/apercu/badge.png)](https://coveralls.io/r/zuzak/apercu)

[![wercker status](https://app.wercker.com/status/18414a32b3b8eddcd3066fdc94c761a9 "wercker status")](https://app.wercker.com/project/bykey/18414a32b3b8eddcd3066fdc94c761a9)

## Installation
* ``npm install``
* ``npm start``

## Configuration
* You can edit the configuration by creating a ``config.json`` with the
  settings you want.

  ```
  {
      "ip":"127.0.0.1",
      "port":"127.0.0.",
      "githubsecret":"",
      "githubid":"ac164af2be0ddae99bce",
      "repos":[
        "visionmedia/jade",
        "apernwarr/sshuttle",
        "gitlab/gitlabhq",
        "zuzak/apercu"
      ],
      "environ": "dev"
   }
   ```
* Alternatively, you can set the configurations via environment variables.
  Check ``config.js`` for a list.
* The ``githubsecret`` and ``githubid`` variables are optional, but you may run
  into problems quickly as the Github API rate limits fairly quickly.
  You can get keys to increase the rate limit via
  [Github's settings](https://github.com/settings/applications)

## Testing
* You should ``export NODE_ENV="test"`` before testing. This will replace the
  list of repositories with a standardised, static set of repositories.
* With the app running, run ``npm test``.
* Tests should output a ``*** TESTING ***`` if the correct environ is set.
