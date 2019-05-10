import { GlobalService } from './../../services/core/global.service';
import { MainMenuService, MenuRq } from '../../services/api/main-menu/main-menu.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ApplicationRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'gp-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
/**
 * Clase Menu que agrupa los servicios accesibles por el username
 */
export class MainMenuComponent implements OnInit, AfterViewInit {
  /* The items needed in the menu */
  menuItems: Observable<any>;

  /* When the menu is loaded, an event is triggered */
  @Output() menuCharged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private mainMenuService: MainMenuService, private appRef: ApplicationRef) {}

  ngOnInit() {
    this.initMenu();
  }

  /**
   * Waiting to view is loaded to trigger the event to parent component
   * for init the layout.js
   */
  ngAfterViewInit() {
    this.menuCharged.emit(true);
  }

  /* Set menu items */
  initMenu() {
    const sessionId = sessionStorage.getItem('sessionId');
    const request = new MenuRq(sessionId, GlobalService.getPARAMS());
    this.menuItems = this.mainMenuService.obtenMenu(request);
  }

  refresh() {
    this.appRef.tick();
  }
}
