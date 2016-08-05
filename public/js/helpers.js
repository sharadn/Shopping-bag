// Handlebars templates.
// author: Sharad Biradar

// ensure our namespace
if (!this.shoppingbag) {
    this.shoppingbag = {};
}
if (!this.shoppingbag.app) {
    this.shoppingbag.app = {};
}

if (!this.shoppingbag.app.promise) {
    this.shoppingbag.app.promise = {};
}

(function(shoppingbag, $, Handlebars) {
    Handlebars.registerHelper("getColors", function(colorsArray){
        var colorArray = [];
        for(var i=0;i<colorsArray.length;i++){
            colorArray.push(colorsArray[i].name);
        }
        return new Handlebars.SafeString(colorArray.join());
    });

    Handlebars.registerHelper("jsonStringify", function(cartItemObject){
        return JSON.stringify(cartItemObject);
    });

    Handlebars.registerHelper("availableColors", function(colorObject){
        var markup = '<label class="color-box" style="background-color:'+colorObject.hexcode+'"></label>';
        return new Handlebars.SafeString(markup);
    });
    Handlebars.registerHelper("createOptions", function(sizesObject){
        var markup = '<option value='+sizesObject.name+'>'+sizesObject.name+'</option>';
        return new Handlebars.SafeString(markup);
    });
    
})(this.shoppingbag, jQuery, Handlebars);
