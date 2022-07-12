"use strict";
exports.__esModule = true;
exports.ResolverService = void 0;
{
}
var ResolverService = /** @class */ (function () {
    function ResolverService(ComponentService) {
        this.ComponentService = ComponentService;
    } // where we define our  router id from service (service get router id from component)
    ResolverService.prototype.resolve = function (route, state) {
        this.ComponentService.getRouterMethodName(+route.params['id']);
    };
    return ResolverService;
}());
exports.ResolverService = ResolverService;
