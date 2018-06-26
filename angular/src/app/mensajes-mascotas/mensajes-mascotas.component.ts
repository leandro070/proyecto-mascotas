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
  constructor(private messageService: MessageService, private mascotaService: MascotaService) { }

  ngOnInit() {
    this.messageService.getAllMessage().then((data) => {
      this.mensajes = data;
        this.mascotaService.buscarMascotas().then((data) => {
          this.mascotas = data;
          this.mascotas.forEach(element => {
            // this.mascotaService.buscarImagen(element.picture).then((data) => ); // guardar images y mascotas juntas en una array
          });
        });
    });
  }

}
