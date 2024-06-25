
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role : any = "";

    ngOnInit() {
        this.role =  localStorage.getItem("role");

        this.model = [
            // {
            //     label: 'Dashboards',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'E-Commerce',
            //             icon: 'pi pi-fw pi-home',
            //             routerLink: ['/']
            //         }
            //     ]
            // },
            // {
            //     label: 'Apps',
            //     icon: 'pi pi-th-large',
            //     items: [
            //         {
            //             label: 'Blog',
            //             icon: 'pi pi-fw pi-comment',
            //             items: [
            //                 {
            //                     label: 'List',
            //                     icon: 'pi pi-fw pi-image',
            //                     routerLink: ['/apps/blog/list']
            //                 },
            //                 {
            //                     label: 'Detail',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/apps/blog/detail']
            //                 },
            //                 {
            //                     label: 'Edit',
            //                     icon: 'pi pi-fw pi-pencil',
            //                     routerLink: ['/apps/blog/edit']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Calendar',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/apps/calendar']
            //         },
            //         {
            //             label: 'Chat',
            //             icon: 'pi pi-fw pi-comments',
            //             routerLink: ['/apps/chat']
            //         },
            //         {
            //             label: 'Files',
            //             icon: 'pi pi-fw pi-folder',
            //             routerLink: ['/apps/files']
            //         },
            //         {
            //             label: 'Kanban',
            //             icon: 'pi pi-fw pi-sliders-v',
            //             routerLink: ['/apps/kanban']
            //         },
            //         {
            //             label: 'Mail',
            //             icon: 'pi pi-fw pi-envelope',
            //             items: [
            //                 {
            //                     label: 'Inbox',
            //                     icon: 'pi pi-fw pi-inbox',
            //                     routerLink: ['/apps/mail/inbox']
            //                 },
            //                 {
            //                     label: 'Compose',
            //                     icon: 'pi pi-fw pi-pencil',
            //                     routerLink: ['/apps/mail/compose']
            //                 },
            //                 {
            //                     label: 'Detail',
            //                     icon: 'pi pi-fw pi-comment',
            //                     routerLink: ['/apps/mail/detail/1000']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Task List',
            //             icon: 'pi pi-fw pi-check-square',
            //             routerLink: ['/apps/tasklist']
            //         }
            //     ]
            // },
            // {
            //     label: 'UI Kit',
            //     icon: 'pi pi-fw pi-star-fill',
            //     items: [
            //         // {
            //         //     label: 'Form Layout',
            //         //     icon: 'pi pi-fw pi-id-card',
            //         //     routerLink: ['/uikit/formlayout']
            //         // },
            //         // {
            //         //     label: 'Input',
            //         //     icon: 'pi pi-fw pi-check-square',
            //         //     routerLink: ['/uikit/input']
            //         // },
            //         // {
            //         //     label: 'Float Label',
            //         //     icon: 'pi pi-fw pi-bookmark',
            //         //     routerLink: ['/uikit/floatlabel']
            //         // },
            //         // {
            //         //     label: 'Invalid State',
            //         //     icon: 'pi pi-fw pi-exclamation-circle',
            //         //     routerLink: ['/uikit/invalidstate']
            //         // },
            //         // {
            //         //     label: 'Button',
            //         //     icon: 'pi pi-fw pi-box',
            //         //     routerLink: ['/uikit/button']
            //         // },
            //         // {
            //         //     label: 'Table',
            //         //     icon: 'pi pi-fw pi-table',
            //         //     routerLink: ['/uikit/table']
            //         // },
            //         {
            //             label: 'List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['/uikit/list']
            //         },
            //         // {
            //         //     label: 'Tree',
            //         //     icon: 'pi pi-fw pi-share-alt',
            //         //     routerLink: ['/uikit/tree']
            //         // },
            //         // {
            //         //     label: 'Panel',
            //         //     icon: 'pi pi-fw pi-tablet',
            //         //     routerLink: ['/uikit/panel']
            //         // },
            //         // {
            //         //     label: 'Overlay',
            //         //     icon: 'pi pi-fw pi-clone',
            //         //     routerLink: ['/uikit/overlay']
            //         // },
            //         // {
            //         //     label: 'Media',
            //         //     icon: 'pi pi-fw pi-image',
            //         //     routerLink: ['/uikit/media']
            //         // },
            //         // {
            //         //     label: 'Menu',
            //         //     icon: 'pi pi-fw pi-bars',
            //         //     routerLink: ['/uikit/menu'],
            //         //     routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
            //         // },
            //         // {
            //         //     label: 'Message',
            //         //     icon: 'pi pi-fw pi-comment',
            //         //     routerLink: ['/uikit/message']
            //         // },
            //         // {
            //         //     label: 'File',
            //         //     icon: 'pi pi-fw pi-file',
            //         //     routerLink: ['/uikit/file']
            //         // },
            //         // {
            //         //     label: 'Chart',
            //         //     icon: 'pi pi-fw pi-chart-bar',
            //         //     routerLink: ['/uikit/charts']
            //         // },
            //         // {
            //         //     label: 'Misc',
            //         //     icon: 'pi pi-fw pi-circle-off',
            //         //     routerLink: ['/uikit/misc']
            //         // }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     icon: 'pi pi-fw pi-prime',
            //     items: [
            //         {
            //             label: 'Free Blocks',
            //             icon: 'pi pi-fw pi-eye',
            //             routerLink: ['/blocks']
            //         },
            //         {
            //             label: 'All Blocks',
            //             icon: 'pi pi-fw pi-globe',
            //             url: ['https://www.primefaces.org/primeblocks-ng'],
            //             target: '_blank'
            //         }
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     icon: 'pi pi-fw pi-compass',
            //     items: [
            //         {
            //             label: 'PrimeIcons',
            //             icon: 'pi pi-fw pi-prime',
            //             routerLink: ['utilities/icons']
            //         },
            //         {
            //             label: 'Colors',
            //             icon: 'pi pi-fw pi-palette',
            //             routerLink: ['utilities/colors']
            //         },
            //         {
            //             label: 'PrimeFlex',
            //             icon: 'pi pi-fw pi-desktop',
            //             url: ['https://www.primefaces.org/primeflex/'],
            //             target: '_blank'
            //         },
            //         {
            //             label: 'Figma',
            //             icon: 'pi pi-fw pi-pencil',
            //             url: ['https://www.figma.com/file/zQOW0XBXdCTqODzEOqwBtt/Preview-%7C-Apollo-2022?node-id=335%3A21768&t=urYI89V3PLNAZEJG-1/'],
            //             target: '_blank'
            //         }
            //     ]
            // },
            {
        ];
    }
}
