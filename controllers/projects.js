'use strict'

var db = require('../database.js');

module.exports = function(app) {

		app.get('/projects/add', function(req, res) {
				res.render('projects-add');
			}),

			app.post('/projects', function(req, res) {
				db.transaction(function(trx) {
					db('projects')
						.transacting(trx)
						.insert({
							name: req.body.name,
							description: req.body.description,
							goal_amount: req.body.amount,
						})
						.then(function(result) {
							db('project_addresses')
								.insert({
									project_id: result,
									token: req.body.token

								}).then(function(result) {
									res.redirect('/');
								})
						})
						.then(trx.commit)
						.catch(trx.rollback)
						.catch(function(error) {
							console.log(error);
						})


				})

			}),


			app.delete('/projects/:id', function(req, res) {
				var id = req.params.id;
				console.log(id)
				db.transaction(function(trx) {
					// Note: make sure an address can be assigned to 1 project only or that no other project uses it
					db('project_addresses')
						.transacting(trx)
						.where('project_id', id)
						.del()
						.catch(function(error) {
							console.log(error);
						})
						.then(
							db('projects')
							.where('id', id)
							.del()
							.catch(function(error) {
								console.log(error);
							})
						)
						.then(trx.commit)
						.catch(trx.rollback)
						.catch(function(error) {
							console.log(error);
						})
						.finally(function() {
							res.end();
						})
				})
			})



	} // closing module.export