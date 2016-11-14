'use strict';

/* Bcrypt wrapper */

// Detect which Bcrypt we're running
// If The Original Bcrypt

try {
	var bcrypt = require('bcrypt')
	var bcryptVar = "bcrypt";
} catch (err) {
	bcrypt = null
}
if (!bcrypt) {
	// or the Windows compatible module
	bcrypt = require('bcrypt-nodejs')
	bcryptVar = "bcypt-nodejs";
}

var clone = bcrypt.hash;

bcrypt.hash = function(resultPassword, salt, callback) {
	if (bcryptVar == "bcrypt") { // bcrypt
		return clone(resultPassword, salt, callback);
	} else { // bcrypt-node
		return clone(resultPassword, salt, null, callback);
	}
}

module.exports = bcrypt;