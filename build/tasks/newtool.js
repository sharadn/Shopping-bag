// grunt task for creating a new Tool
// author: Sharad
'use strict';

module.exports = function(grunt) {

    var toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    grunt.registerTask('newtool', 'Create a new Gensler Tool.', function() {
        if (grunt.task.current.args.length > 0) {
            for (var i = 0; i < grunt.task.current.args.length; i++) {
                var name = grunt.task.current.args[i];
                var nameMinusHyphens = name.replace(/-/g, '');
                grunt.log.write('creating tool ' + name);
                
                // css
                var css = grunt.file.read('boilerplate/archi-tool.css');
                css = css.replace(/architool/g, nameMinusHyphens);
                css = css.replace('Sharad Biradar', '');
                grunt.file.write('public/tool/' + name + '/' + name + '.css', css);
                
                // js
                var js = grunt.file.read('boilerplate/archi-tool.js');
                js = js.replace(/architool/g, nameMinusHyphens);
                js = js.replace('archi-tool', name);
                js = js.replace('Sharad Biradar', '');
                js = js.substring(0, js.indexOf('/*')) + js.substring(js.indexOf('*/') + 4);
                grunt.file.write('public/tool/' + name + '/' + name + '.js', js);
                
                // html
                var html = grunt.file.read('boilerplate/test.html');
                html = html.replace(/archi-tool/g, name);
                html = html.replace(/architool/g, nameMinusHyphens);
                html = html.replace('Sharad Biradar', '');
                html = html.replace('Archi Tool Test Page', name + ' test page');
                grunt.file.write('public/tool/' + name + '/' + 'test.html', html);

                //images
                grunt.file.copy('boilerplate/image/logo.png', 'public/tool/' + name + '/image/logo.png');
                grunt.file.copy('boilerplate/image/logo.png', 'public/tool/' + name + '/image/logo.png');
                grunt.file.copy('boilerplate/image/logo.png', 'public/tool/' + name + '/image/logo.png');
                grunt.log.write(' ...done ').ok();
            }
        } else {
            grunt.log.write('You must specify a tool name, such as "newtool:my-tool"');
        }
    });
};
