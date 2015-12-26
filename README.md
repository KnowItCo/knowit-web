You need:

- mongodb running locally (knowit-web db namespace should be clear or at least don't care about it)
- _config.js file in root of project with appropriate configs (fb app keys etc.)

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