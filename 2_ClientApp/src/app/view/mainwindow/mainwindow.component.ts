import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationManager} from "../../service/authorizationmanager";


@Component({
    selector: 'app-mainwindow',
    templateUrl: './mainwindow.component.html',
    styleUrls: ['./mainwindow.component.css']
})
export class MainwindowComponent {

    opened: boolean = false;
    profileOpened: boolean = false;

    constructor(private router: Router, public authService: AuthorizationManager) {}

    logout(): void {
        this.router.navigateByUrl("login")
        this.authService.clearUsername();
        this.authService.clearButtonState();
        this.authService.clearMenuState();
        localStorage.removeItem("Authorization");
    }

    admMenuItems = this.authService.admMenuItems;
    invMenuItems = this.authService.invMenuItems;
    purchMenuItems = this.authService.purchMenuItems;
    prodMenuItems = this.authService.prodMenuItems;
    customerMenuItems = this.authService.customerMenuItems;
    payMenuItems = this.authService.payMenuItems;
    reportMenuItems = this.authService.reportMenuItems;

    isMenuVisible(category: string): boolean {
        switch (category) {
            case 'Admin':
                return this.admMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Inventory':
                return this.invMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Purchase':
                return this.purchMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Production':
                return this.prodMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Customer':
                return this.customerMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Payment':
                return this.payMenuItems.some(menuItem => menuItem.accessFlag);
            case 'Report':
                return this.reportMenuItems.some(menuItem => menuItem.accessFlag);
            default:
                return false;
        }
    }

}
