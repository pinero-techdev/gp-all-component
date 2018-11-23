import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { RemoteFsysService, ObtenListaFicherosRq } from '../../services/remote-fsys.service';
import { TreeNode } from 'primeng/primeng';
import { Mensajes } from '../../resources/data/mensajes';
import { File } from '../../resources/data/file';
import { Directory } from '../../resources/data/directory';

@Component({
  selector: 'gp-app-remote-fsys-picker',
  templateUrl: './gp.app.remote-fsys-picker.component.html',
  styleUrls: ['./gp.app.remote-fsys-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RemoteFsysService]
})
export class GpAppRemoteFsysPickerComponent extends Mensajes implements OnInit {
  @Input() popup: boolean;
  @Output() link = new EventEmitter<string>();

  displayDialog: boolean = false;

  selectedNode: any = null;
  remoteFsys: TreeNode[] = null;
  lastDirectory: string;

  url: string;
  lastSelected: any;

  constructor(private _remoteFsysService: RemoteFsysService) {
    super();
  }

  ngOnInit() {
    this.getFicheros(new ObtenListaFicherosRq());
  }

  convertToTreeNode(opciones: Directory): TreeNode[] {
    let estructura: TreeNode[] = [];
    if (opciones != null) {
      this.genFiles(opciones.file, estructura);
      if (opciones.directory != null) {
        for (let o of opciones.directory) {
          let auxChildren: TreeNode[] = this.convertToTreeNode(o);
          let aux: TreeNode = {
            label: o.name,
            expanded: false,
            expandedIcon: 'material-icons ui-icon-folder-open',
            collapsedIcon: 'material-icons ui-icon-folder',
            data: { type: 'folder' },
            children: auxChildren
          };
          estructura.push(aux);
        }
      }
    }
    return estructura;
  }

  genFiles(files: File[], estructura: TreeNode[]) {
    if (files != null) {
      for (let o of files) {
        if (o.name != '.DS_Store' && o.name.indexOf('.pdf') == -1 && o.name.indexOf('.db') == -1) {
          let subType = 'image';
          if (o.name.indexOf('.mp4') > -1) {
            subType = 'video';
          }

          let aux: TreeNode = {
            label: o.name,
            expanded: false,
            icon: 'material-icons ui-icon-insert-drive-file',
            data: { type: 'file', size: o.bytesSize, url: o.name, subtype: subType },
            children: []
          };
          estructura.push(aux);
        }
      }
    }
  }

  getFicheros(rq: ObtenListaFicherosRq) {
    this.remoteFsys = null;
    this._remoteFsysService.obtenListaFicheros(rq).subscribe(
      data => {
        if (data.ok) {
          this.remoteFsys = this.convertToTreeNode(data.ficheros);
        } else {
          this.showErrorAlert('Se produjo un error recuperando el sistema de ficheros, intenelo de nuevo.');
        }
      },
      err => console.error(err),
      () => console.debug('finalizado getFicheros')
    );
  }

  getPath(node: TreeNode): string {
    if (node != undefined && node != null) {
      if (node.parent != null) {
        return this.getPath(node.parent) + '/' + node.label;
      } else {
        return node.label;
      }
    }
  }

  getFinalUrl(url: string) {
    if (url != undefined && url != null) {
      return this.url.replace('/www/data/bpcom/public/', 'http://www.bahia-principe.com/public');
    } else {
      return '';
    }
  }

  nodeSelect(e) {
    this.url = this.getPath(this.selectedNode);
    this.url = this.url.replace('/www/data/bpcom/public/', 'http://www.bahia-principe.com/public');
    if (this.lastSelected != undefined && this.lastSelected != null) {
      this.lastSelected.classList.remove('selected');
    }
  }

  selectedThis(e) {
    if (e != undefined && e != null && e.target != undefined && e.target != null) {
      this.lastSelected = e.target;
      if (e.target.id == '') {
        this.lastSelected = e.target.parentElement;
      }
      this.lastSelected.classList.add('selected');
    }
    this.link.emit(this.url);
  }

  selectElement(e) {
    this.link.emit(this.url + '/' + e.value[0].label);
  }
}
