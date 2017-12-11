"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var learn_main_component_1 = require("./learn/learn-main.component");
var FocusRoutes = [
    { path: 'learn', children: [
            { path: '', redirectTo: "main", },
            { path: "main", component: learn_main_component_1.LearnMainComponent, }
        ]
    },
];
exports.FocusRouting = router_1.RouterModule.forChild(FocusRoutes);
//# sourceMappingURL=focus.routing.js.map