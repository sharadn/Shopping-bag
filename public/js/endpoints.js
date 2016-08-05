// app initializing code for search.
// author: Sharad Biradar

// ensure our namespace
if (!this.edum) {
    this.edum = {};
}
if (!this.edum.app) {
    this.edum.app = {};
}

if (!this.edum.app.promise) {
    this.edum.app.promise = {};
}

(function (edum, $) {
	edum.app.endpoints = {
		baseUrl:"http://localhost:8888",
		authentication:"/user/authenticate"
	};
})(this.edum, jQuery);
