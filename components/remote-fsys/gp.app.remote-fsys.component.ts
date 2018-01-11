import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {RemoteFsysService, ObtenListaFicherosRq} from "../../services/remote-fsys.service";
import {TreeNode} from "primeng/primeng";
import {Mensajes} from "../../resources/data/mensajes";
import {File} from "../../resources/data/file";
import {Folder} from "../../resources/data/folder";

@Component({
    selector: 'gp-app-remote-fsys',
    templateUrl: './gp.app.remote-fsys.component.html',
    providers: [RemoteFsysService]
})
export class GpAppRemoteFsysComponent extends Mensajes implements OnInit {
    @Input() popup:boolean;
    @Output() link = new EventEmitter<string>();

    displayDialog:boolean = false;

    selectedNode:any = null;
    remoteFsys:TreeNode[] = null;
    lastDirectory:string;

    url:string;

    constructor(private _remoteFsysService:RemoteFsysService) {
        super();
    }

    ngOnInit() {
        this.getFicheros(new ObtenListaFicherosRq());
        this.showDialog();

    }

    convertToTreeNode(opciones:Folder):TreeNode[] {
        let estructura:TreeNode[] = [];
        if (opciones != null) {
            this.genFiles(opciones.file, estructura);
            if (opciones.folder != null) {
                for (let o of opciones.folder) {
                    let auxChildren:TreeNode[] = this.convertToTreeNode(o);
                    let aux:TreeNode = {
                        label: o.name,
                        expanded: false,
                        data: {"type": "folder"},
                        children: auxChildren
                    };
                    estructura.push(aux);
                }
            }
        }
        return estructura;
    }

    genFiles(files: File[], estructura: TreeNode[]){
        if (files != null) {
            for (let o of files) {
                if (o.name != '.DS_Store' && o.name.indexOf('.pdf') == -1 && o.name.indexOf('.db') == -1) {
                    let aux:TreeNode = {
                        label: o.name,
                        expanded: false,
                        data: {"type": "file", "size": o.bytesSize},
                        children: []
                    };
                    estructura.push(aux);
                }
            }
        }
    }

    getFicheros(rq:ObtenListaFicherosRq) {
        this.remoteFsys = null;
        this._remoteFsysService.obtenListaFicheros(rq).subscribe(
            data => {
                if (data.ok) {
                    this.remoteFsys = this.convertToTreeNode(data.ficheros);
                    console.log(this.remoteFsys);
                } else {
                    this.showErrorAlert("Se produjo un error recuperando el sistema de ficheros, intenelo de nuevo.");
                }
            },
            err => console.error(err),
            () => console.debug("finalizado getFicheros")
        );
    }

    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }

    choose() {
        if (this.selectedNode != null) {
            let url = this.getPath(this.selectedNode);
            this.link.emit(url);
            this.hideDialog();
        } else {
            this.showErrorAlert("Es necesario escoger un elemento del arbol.");
        }
    }

    getPath(node:TreeNode):string{
        if(node != null) {
            if (node.parent != null){
                return this.getPath(node.parent) + "/" + node.label;
            } else {
                return node.label;
            }
        }
    }

    nodeSelect(e){
        this.url = this.getPath(this.selectedNode);
        this.url = this.url.replace("bahia-principe/", "http://www.bahia-principe.com/");
    }

    goPreview() {
        window.open(this.url);
    }

}