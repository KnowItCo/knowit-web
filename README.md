#TODO:

1. Clean up project structure
2. Web quiz (just for demonstration)
3. SMS integration

#Install

- mongodb running locally (knowit-web db namespace should be clear or at least don't care about it)
- _config.js file in root of project with appropriate configs (fb app keys etc.)

Here is what _config.js should look like roughly...

	module.exports = {
		mongo: {
			'url' : 'yadayadayadayada'
		},

		facebook: {
			'appID' : 'yadayada',
			'appSecret' : 'yadayada',
			'callbackUrl' : 'yadayadayadayadayadayada',
			'profileFields': ['emails', 'name']
		},

		session: {
			secret: 'yadayadayadayada'
		}
	}