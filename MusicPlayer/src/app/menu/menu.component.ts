import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',
  './../../../node_modules/primeng/resources/components/grid/grid.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  selected: string;

  ngOnInit() {
    this.selected = 'Default';
    this.items = [
      {
        label: 'Default',
        icon: 'fa-list-ul',
        command: (onclick) => this.onClick(),
        routerLink: ['/playlists'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Default2',
        icon: 'fa-list-ul',
        command: (onclick) => this.onClick(),
        routerLink: ['/playlists'],
        routerLinkActiveOptions: { exact: true }
      }
    ];
  }

  addItem() {
    const input = document.getElementById('newplaylist') as HTMLInputElement;

    if (input.value !== '') {
      this.selected = input.value as string;
      const item = {
        label: this.selected,
        icon: 'fa-list-ul',
        command: (onclick) => this.onClick(),
        routerLink: ['/playlists'],
        routerLinkActiveOptions: { exact: true }
      };
      this.items.push(item);
    }

    (document.getElementById('newplaylist') as HTMLInputElement).value = '';
  }

  onClick() {
    // console.log(this.selected);
  }
}
