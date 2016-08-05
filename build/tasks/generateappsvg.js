// Grabs all of the svgs in the public/dist/image folder, generates svg.js under public/js/app, and creates a map
// of all svgs with key: filename (without .svg), value: svg output.
//
// Please make sure that all the svgs are already located in public/dist/image.
//
// author:Sharad
'use strict';

module.exports = function(grunt) {

    grunt.registerTask('generateappsvg', 'Generates gensler.app.svg file that references all svgs in the project.', function() {
        var files = grunt.file.expand('public/dist/image/*.svg');
        var numFiles = files.length;
        console.log(numFiles + ' svg files found.');

        var filesProcessed = 0;

        var fileOutput = "// This is an auto-generated file. Do not check this in!\n" +
            "if (!this.gensler) {\n    this.gensler = {};\n}\n\n" +
            "if (!this.gensler.app) {\n    this.gensler.app = {};\n}\n\n" +
            "(function(gensler) {\n" +
            "    gensler.app.svg = {\n";

        files.forEach(function(file, index) {
            // filename + : + filecontents
            var fileName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
            var svg = grunt.file.read(file);
            // strip all newlines.
            svg = svg.replace(/(\r\n|\n|\r|\t)/gm, "");
            // strip all comments.
            svg = svg.replace(/<!--.*-->/gm, "");
            // output to the "buffer"
            fileOutput += "        '" + fileName + "':'" + svg + "'";
            // don't append the comma if we're on the last item.
            fileOutput += index < numFiles - 1 ? "," : "";

            fileOutput += "\n";
            filesProcessed++;
        });

        fileOutput += "    };\n})(this.gensler);";

        var svgPath = 'public/js/svg.js';
        // Delete the svg.js file if it exists.
        if (grunt.file.exists(svgPath)) {
            grunt.file.delete(svgPath);
        }

        // we're done. write to the js file.
        grunt.file.write(svgPath, fileOutput);
        console.log(filesProcessed + ' svg files processed.');
    });

};