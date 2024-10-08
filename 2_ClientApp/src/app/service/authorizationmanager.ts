import {Injectable} from '@angular/core';
import {AuthoritySevice} from './authoritysevice';

@Injectable()
export class AuthorizationManager {

    private readonly localStorageUsername = 'username';
    private readonly localStorageButtonKey = 'buttonState';
    private readonly localStorageAdmMenus = 'admMenuState';
    private readonly localStorageInvMenus = 'invMenuState';
    private readonly localStoragePurchMenus = 'purchMenuState';
    private readonly localStorageProdMenus = 'prodMenuState';
    private readonly localStorageCustomerMenus = 'customerMenuState';
    private readonly localStoragePayMenus = 'payMenuState';
    private readonly localStorageReportMenus = 'reportMenuState';
    private readonly localStorageRegMenus = 'regMenuState';

    public enaadd = false;
    public enaupd = false;
    public enadel = false;

    admMenuItems = [
        {name: 'Employee', accessFlag: true, routerLink: 'employee'},
        {name: 'User', accessFlag: true, routerLink: 'user'},
        {name: 'Privilege', accessFlag: true, routerLink: 'privilege'},
        {name: 'Operation', accessFlag: true, routerLink: 'operation'}
    ];

    invMenuItems = [
        {name: 'Ingredient', accessFlag: true, routerLink: 'ingredient'},
        {name: 'Product', accessFlag: true, routerLink: 'product'}
    ];

    purchMenuItems = [
        {name: 'Purchase Order', accessFlag: true, routerLink: 'purchase'},
        {name: 'GRN', accessFlag: true, routerLink: 'grn'},
        {name: 'Supplier', accessFlag: true, routerLink: 'supplier'}
    ];

    prodMenuItems = [
        {name: 'Production', accessFlag: true, routerLink: 'production'},
        {name: 'Production Order', accessFlag: true, routerLink: 'productionorder'},
    ];

    customerMenuItems = [
        {name: 'Customer', accessFlag: true, routerLink: 'customer'},
        {name: 'Customer Order', accessFlag: true, routerLink: 'customerorder'},
    ];

    payMenuItems = [
        {name: 'Invoice', accessFlag: true, routerLink: 'invoice'},
        {name: 'Customer Payment', accessFlag: true, routerLink: 'customerpayment'},
        {name: 'Supplier Payment', accessFlag: true, routerLink: 'supplierpayment'},
    ];

    reportMenuItems = [
        {name: "Count By Designation", accessFlag: true, routerLink: "reports/countbydesignation"},
        {name: "Ingredient Count By Category", accessFlag: true, routerLink: "reports/ingredientcountbycategory"}
    ];

    constructor(private am: AuthoritySevice) {
    }

    enableButtons(authorities: { module: string; operation: string }[]): void {
        this.enaadd = authorities.some(authority => authority.operation === 'insert');
        this.enaupd = authorities.some(authority => authority.operation === 'update');
        this.enadel = authorities.some(authority => authority.operation === 'delete');

        // Save button state in localStorage
        localStorage.setItem(this.localStorageButtonKey, JSON.stringify({enaadd: this.enaadd, enaupd: this.enaupd, enadel: this.enadel}));
    }

    enableMenues(modules: { module: string; operation: string }[]): void {
        this.admMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.invMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.purchMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.prodMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.customerMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.payMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        this.reportMenuItems.forEach(menuItem => {
            menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
        });

        // Save menu state in localStorage
        localStorage.setItem(this.localStorageAdmMenus, JSON.stringify(this.admMenuItems));
        localStorage.setItem(this.localStorageInvMenus, JSON.stringify(this.invMenuItems));
        localStorage.setItem(this.localStoragePurchMenus, JSON.stringify(this.purchMenuItems));
        localStorage.setItem(this.localStorageProdMenus, JSON.stringify(this.prodMenuItems));
        localStorage.setItem(this.localStorageCustomerMenus, JSON.stringify(this.customerMenuItems));
        localStorage.setItem(this.localStoragePayMenus, JSON.stringify(this.payMenuItems));
        localStorage.setItem(this.localStorageReportMenus, JSON.stringify(this.reportMenuItems));
    }

    async getAuth(username: string): Promise<void> {

        this.setUsername(username);

        try {
            const result = await this.am.getAutorities(username);
            if (result !== undefined) {
                const authorities = result.map(authority => {
                    const [module, operation] = authority.split('-');
                    return {module, operation};
                });
                console.log(authorities);

                this.enableButtons(authorities);
                this.enableMenues(authorities);

            } else {
                console.log('Authorities are undefined');
            }
        } catch (error) {
            console.error(error);
        }
    }

    getUsername(): string {
        return localStorage.getItem(this.localStorageUsername) || '';
    }

    setUsername(value: string): void {
        localStorage.setItem(this.localStorageUsername, value);
    }

    getEnaAdd(): boolean {
        return this.enaadd;
    }

    getEnaUpd(): boolean {
        return this.enaupd;
    }

    getEnaDel(): boolean {
        return this.enadel;
    }

    initializeButtonState(): void {
        const buttonState = localStorage.getItem(this.localStorageButtonKey);
        if (buttonState) {
            const {enaadd, enaupd, enadel} = JSON.parse(buttonState);
            this.enaadd = enaadd;
            this.enaupd = enaupd;
            this.enadel = enadel;
        }
    }

    initializeMenuState(): void {
        const admMenuState = localStorage.getItem(this.localStorageAdmMenus);
        if (admMenuState) {
            this.admMenuItems = JSON.parse(admMenuState);
        }

        const invMenuState = localStorage.getItem(this.localStorageInvMenus);
        if (invMenuState) {
            this.invMenuItems = JSON.parse(invMenuState);
        }

        const purchMenuState = localStorage.getItem(this.localStoragePurchMenus);
        if (purchMenuState) {
            this.purchMenuItems = JSON.parse(purchMenuState);
        }

        const prodMenuState = localStorage.getItem(this.localStorageProdMenus);
        if (prodMenuState) {
            this.prodMenuItems = JSON.parse(prodMenuState);
        }

        const customerMenuState = localStorage.getItem(this.localStorageCustomerMenus);
        if (customerMenuState) {
            this.customerMenuItems = JSON.parse(customerMenuState);
        }

        const payMenuState = localStorage.getItem(this.localStoragePayMenus);
        if (payMenuState) {
            this.payMenuItems = JSON.parse(payMenuState);
        }

        const reportMenuState = localStorage.getItem(this.localStorageReportMenus);
        if (reportMenuState) {
            this.reportMenuItems = JSON.parse(reportMenuState);
        }

    }

    clearUsername(): void {
        localStorage.removeItem(this.localStorageUsername);
    }

    clearButtonState(): void {
        localStorage.removeItem(this.localStorageButtonKey);
    }

    clearMenuState(): void {
        localStorage.removeItem(this.localStorageAdmMenus);
        localStorage.removeItem(this.localStorageInvMenus);
        localStorage.removeItem(this.localStoragePurchMenus);
        localStorage.removeItem(this.localStorageProdMenus);
        localStorage.removeItem(this.localStorageCustomerMenus);
        localStorage.removeItem(this.localStoragePayMenus);
        localStorage.removeItem(this.localStorageReportMenus);
    }

    isMenuItemDisabled(menuItem: { accessFlag: boolean }): boolean {
        return !menuItem.accessFlag;
    }

}
