/**
 * JobsController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 function seedData(req, res, data) {
   CSV.parseCsv({
     csvData: data,
     schema: '*',
     hasHeaderRow: true,
     }).exec({
         // An unexpected error occurred.
       error: function (err){
         res.send("An error has ocurred, check logs");
         console.log(err);
       },
       // OK.
       success: function (data){

         for (var i=0; i<data.length; i++) {
           console.log(data);
           Jobs.findOrCreate({key: data[i].llave}, {
             key: data[i].llave,
             hija : data[i].Hija,
             madre : data[i].Madre,
             codCliente : data[i].CodCliente,
             AuthorizationID : data[i].AuthorizationID,
             AuthorizationNum : data[i].AuthorizationNum,
             vehicleid : data[i].vehicleid,
             odometer : data[i].odometer,
             Productcode : data[i].Productcode,
             transamount : data[i].transamount,
             transdate : data[i].transdate,
             processdate : data[i].processdate,
             transtime : data[i].transtime,
             merchantid : data[i].merchantid
           }).exec(function (err,dataCb){
    			 	    console.log(dataCb);
    			 });
         }
         res.redirect('jobs/');
       },

   });

 }
 var CSV = require('machinepack-csv');
 var json2csv = require('json2csv');
module.exports = {
		home : function (req, res) {
		 return	res.send("prueba");
	 },

		seed : function (req, res) {
	        var fs = require ('fs');
	        i=0;
	        fs.readFile('data1.csv', 'utf-8', function(err, data) {
	            if (err) throw err;
	            lines = data.split('\n');
	            seedData(req, res, data);
	        });
	},

  exportar : function (req, res) {
    Jobs.find()
    .exec(function (err,dataCb){
      json2csv({ data: dataCb }, function(err, csv) {
        if (err) console.log(err);
        res.set({
          'Content-type': 'text/csv',
          'Content-Disposition': 'attachment',
          'filename': 'file.csv'
        });
        res.send(csv);
      });
    });
  }
};
