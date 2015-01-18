/*
 * grunt-init-titan-app
 * https://gruntjs.com/
 */

'use strict';

// Basic template description.
exports.description = '';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'done';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';


var processEntities = function (init, entity) {
    var templateFilePath = 'temp/theTemp.js';

    var target = "" + entity.package + "/" + entity.name + ".java";

    var file = {};

    file[target] = 'one/root/temp/theTemp.java';


    var props = {
        "props": "private String thing;\nprivate Int other;"
    };

    init.copyAndProcess(file, props);
};

// The actual init template.
exports.template = function (grunt, init, done) {

    init.process({}, [
        // Prompt for these values.
        init.prompt('name', 'myproj'),
        init.prompt('directory', 'something'),
        init.prompt('configFile', '/Users/ruairiobrien/Dev/new-template/config.json')
    ], function (err, props) {
        props.keywords = [];

        var fs = require('fs');
        var config = JSON.parse(fs.readFileSync(props.configFile, 'utf8'));

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        console.log(files);

        if (!config.entities && config.entities.length < 1) {
            console.log('No entities configured.');
        } else {
            config.entities.forEach(function (entity) {
                processEntities(init, entity);
            });
        }

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // All done!
        done();
    });

};