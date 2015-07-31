module.exports = {


  friendlyName: 'Parse CSV',


  description: 'Parse comma-separated value data',


  extendedDescription: 'Given a string of CSV data, transforms it into an array of objects (if header data is provided) or an array of arrays.',


  inputs: {

    csvData: {
      friendlyName: "CSV Data",
      description: "A string of CSV data.",
      example: '"1","2","3","4"\n"a","b","c","d"',
      required: true
    },
    hasHeaderRow: {
      friendlyName: "Has header row?",
      description: "Indicates whether or not the data has a header row.",
      example: true,
      extendedDescription: "If the data has a header row, it will be ignored in the output."
    },
    schema: {
      friendlyName: "Schema",
      description: "Expected schema of each parsed row",
      typeclass: '*',
      required: true
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
      example: 'Invalid closing quote at line 1'
    },

    success: {
      description: 'Done.',
      getExample: function(inputs, env) {
        return [inputs.schema];
      }
    },

  },


  fn: function (inputs,exits) {
    var parse = require('csv-parse');
    var options = {};
    if (inputs.hasHeaderRow) {options.columns = true;}
    options.auto_parse = true;
    options.ltrim = true;
    options.rtrim = true;
    options.skip_empty_lines = true;
    parse(inputs.csvData, options, function(err, output) {
      if (err) {return exits.error(err);}
      return exits.success(output);
    });
  }



};
