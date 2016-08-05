// application-wide edit dialog
// author: Sharad Biradar
// ensure our namespace
/*
	The edit dialog is a general-purpose dialog for editing content.
	You can pass content and a function to be called before the dialog is opened.
	The options for the edit dialog should look something like this:
	{
		title: 'title',
		template: anHTMLString,
        dialogButtons:[{
            class:'', //it may be either primary, secondary or danger
            type:'close', //It is close or undefined
            text:'button text',
            handler:callback function
        },{

        },{

        }],
        backdrop:true,
        keyboard:false,
        show:false,
        beforeOpen: function() {},
	}
*/
(function (shoppingbag, $) {
    shoppingbag.app.dialog = function(options){
        /*options = {
            template:"html markup",
            dialogOptions:{};
        };*/
        var body = $('body');
        var shoppingbagDialog = $(body).find('.dialog-container');
        $(shoppingbagDialog).empty();
        shoppingbagDialog.append(options.template);
        $(shoppingbagDialog).dialog(options.dialogOptions);
    };
    
})(this.shoppingbag, jQuery);
