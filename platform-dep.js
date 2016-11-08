'use strict';

/* Bcrypt */

// Windows compatible module
try {
	var bcrypt = require('bcrypt-nodejs')
} catch (err) {
	bcrypt = null
}
if (bcrypt) {
	exports.bcrypt = bcrypt;
};

// The Original Bcrypt
try {
	var bcrypt = require('bcrypt')
} catch (err) {
	bcrypt = null
}
if (bcrypt) {
	exports.bcrypt = bcrypt;
};