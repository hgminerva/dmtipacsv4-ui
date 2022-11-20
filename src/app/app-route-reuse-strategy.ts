import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export class AppRouteReuseStrategy implements RouteReuseStrategy {

    private handlers: { [key: string]: DetachedRouteHandle } = {};

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        switch (route.routeConfig.path) {
            case '': break;
            case 'home': break;
            case 'account/login': break;
            case 'account/register': break;
            case 'software': break;
            case 'software/dashboard': break;
            case 'user/detail/:id': break;
            case 'procedure/detail/:id': break;
            default: {
                this.handlers[route.routeConfig.path] = handle;
                break;
            }
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (curr.routeConfig != null) {
            let sideNavMenuDashboard = document.getElementById("sideNavMenuDashboard");
            let sideNavMenuBodyParts = document.getElementById("sideNavMenuBodyParts");
            let sideNavMenuModalityProcedure = document.getElementById("sideNavMenuModalityProcedure");
            let sideNavMenuUser = document.getElementById("sideNavMenuUser");
            let sideNavMenuRate = document.getElementById("sideNavMenuRate");
            let sideNavMenuProcedure = document.getElementById("sideNavMenuProcedure");
            let sideNavMenuReports = document.getElementById("sideNavMenuReports");
    
            switch (curr.routeConfig.path) {
                case 'dashboard': {
                    sideNavMenuDashboard.classList.add("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'body/parts': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.add("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'modality/procedure': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.add("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'user': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.add("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'rate': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.add("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'procedure': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.add("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'procedure/detail/:id': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.add("sideNavMenuStyles");
                    sideNavMenuReports.classList.remove("sideNavMenuStyles");
                    break;
                };
                case 'reports': {
                    sideNavMenuDashboard.classList.remove("sideNavMenuStyles");
                    sideNavMenuBodyParts.classList.remove("sideNavMenuStyles");
                    sideNavMenuModalityProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuUser.classList.remove("sideNavMenuStyles");
                    sideNavMenuRate.classList.remove("sideNavMenuStyles");
                    sideNavMenuProcedure.classList.remove("sideNavMenuStyles");
                    sideNavMenuReports.classList.add("sideNavMenuStyles");
                    break;
                };
                default: {
                    break;
                }
            }
        }

        return future.routeConfig === curr.routeConfig;
    }
}