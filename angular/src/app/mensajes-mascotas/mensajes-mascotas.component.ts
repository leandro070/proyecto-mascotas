import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "../perfil-mascota/message.service";
import { Mascota, MascotaService } from "../mascota/mascota.service";

@Component({
    selector: "app-mensajes-mascotas",
    templateUrl: "./mensajes-mascotas.component.html",
    styleUrls: ["./mensajes-mascotas.component.css"]
})
export class MensajesMascotasComponent implements OnInit {
    mensajes: Message[] = [];
    mascotas: Mascota[] = [];
    mensajesVista: {
        mensaje: string,
        name: string,
        picture: string,
    }[] = []
    constructor(private messageService: MessageService, private mascotaService: MascotaService) { }

    ngOnInit() {
        this.messageService.getAllMessage().then((data) => {
            this.mensajes = data;
            let index = 0
            this.mensajes.forEach(element => {
                this.mensajesVista[index] = { mensaje: element.message, picture: '', name: '' }
                this.mascotaService.buscarMascota(element.pet).then((data) => {
                    let mascota = data;
                    this.mensajesVista[index].name = data.name;
                    this.mascotaService.buscarImagen(mascota.picture).then((data) => {
                        let image = data;
                        this.mensajesVista[index].picture = image.image;
                    });
                });
            });
        });
    }
}
