import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {RemoteFsysService, ObtenListaFicherosRq, ObtenNivelSuperiorRq} from "../../services/remote-fsys.service";
import {TreeNode} from "../../../primeng/primeng";
import {Mensajes} from "../../resources/data/mensajes";

@Component({
    selector: 'gp-app-remote-fsys',
    templateUrl: 'gp.app.remote-fsys.component.html',
    providers: [RemoteFsysService]
})
export class GpAppRemoteFsysComponent extends Mensajes implements OnInit {
    @Input() url:string;
    @Input() popup:boolean;
    @Input() host_root:string;

    @Output() link = new EventEmitter<string>();

    displayDialog:boolean = false;

    selectedNode:any = null;
    remoteFsys:TreeNode[] = null;
    lastDirectory:string;

    constructor(private _remoteFsysService:RemoteFsysService) {
        super();
    }

    ngOnInit() {
        this.getFicheros(new ObtenListaFicherosRq(null));
        this.showDialog();

    }

    convertToTreeNode(opciones:string[]):TreeNode[] {
        let estructura:TreeNode[] = [];
        for (let o of opciones) {
            let aux:TreeNode = {
                label: o,
                expanded: false,
                data: {},
                children: []
            };
            estructura.push(aux);
        }
        return estructura;
    }

    getFicheros(rq:ObtenListaFicherosRq) {
        this.remoteFsys = null;
        this._remoteFsysService.obtenListaFicheros(rq).subscribe(
            data => {
                if (data.ok) {
                    this.remoteFsys = this.convertToTreeNode(data.ficheros);
                } else {
                    this.showErrorAlert("Se produjo un error recuperando el sistema de ficheros, intenelo de nuevo.");
                }
            },
            err => console.error(err),
            () => console.debug("finalizado getFicheros")
        );
    }

    getNivelSuperior(rq:ObtenNivelSuperiorRq) {
        this.remoteFsys = null;
        this._remoteFsysService.obtenNivelSuperior(rq).subscribe(
            data => {
                if (data.ok) {
                    this.remoteFsys = this.convertToTreeNode(data.ficheros);
                    this.lastDirectory = data.directorio;
                } else {
                    this.showErrorAlert("Se produjo un error recuperando el sistema de ficheros, intenelo de nuevo.");
                }
            },
            err => console.error(err),
            () => console.debug("finalizado getNivelSuperior")
        );
    }

    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }

    nodeSelect(e) {
        if (this.lastDirectory == null) {
            this.lastDirectory = this.host_root;
        }
        if(this.selectedNode.label.indexOf('.') == -1) {
            this.lastDirectory = this.lastDirectory + "/" + this.selectedNode.label;
            this.getFicheros(new ObtenListaFicherosRq(this.lastDirectory + "/"));
        }
    }

    nodeUnselect(e) {
    }

    anterior() {
        let rq = new ObtenNivelSuperiorRq(this.lastDirectory);
        this.getNivelSuperior(rq);
    }

    choose() {
        if (this.selectedNode != null) {
            this.link.emit(this.lastDirectory + "/" + this.selectedNode.label);
            this.hideDialog();
        } else {
            this.showErrorAlert("Es necesario escoger un elemento del arbol.");
        }
    }
}