/**
 * JobsController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	jobs: function(req, res) {
        Jobs.query('SELECT * FROM jobs', function(err, jobs) {
            console.log(jobs);
						return  res.view('homepage',{
                j: jobs
            });
        });
    },

		all: function(req, res) {
	        Jobs.query('SELECT * FROM jobs', function(err, jobs) {
							return  res.json(jobs);
	        });
	    }
};
