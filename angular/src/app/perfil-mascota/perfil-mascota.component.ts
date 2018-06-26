import { Component, OnInit, Input } from "@angular/core";
import { PerfilMascotaService, Perfil } from "./perfil-mascota.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Image } from "../perfil/perfil.service";
import { MascotaService, Mascota } from "../mascota/mascota.service";
import * as errorHandler from "../tools/error-handler";
import { MessageService, Message } from "./message.service";

@Component({
  selector: "app-perfil-mascota",
  templateUrl: "./perfil-mascota.component.html",
  styleUrls: ["./perfil-mascota.component.css"]
})
export class PerfilMascotaComponent implements OnInit {
  imagen: Image;
  mascota: Mascota;
  errorMessage: string;
  errors: string[] = [];
  mensaje: string;
  mensajes: Message[];

  constructor(
    private perfilMascotaService: PerfilMascotaService,
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private messageService: MessageService
  ) {
    this.imagen = {
      image: ""
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idMascota = params["mascotaId"];
      this.mascotaService.buscarMascota(idMascota).then((data) => {
        this.mascota = data;
        console.log(this.mascota);
        if (this.mascota.picture) {
          this.mascotaService.buscarImagen(this.mascota.picture)
          .then((data) => {
            this.imagen = data;
            this.getMessages();
          });
        }
      }).catch(err => console.error(err));
    });
  }

  actualizarImagen(imagen: any) {
    this.mascota.picture = undefined;
    this.imagen.image = imagen;
    this.mascotaService.guardarImagen(this.imagen).then((data) => {
      console.log(data);
      this.mascota.picture = data.id;
    });
    this.submitForm();
  }

  sendMessage() {
    const data: Message = {
      message: this.mensaje,
      pet: this.mascota._id,
    };
    this.messageService.sendMessage(data)
    .then((data) => {
      if (data) {
        this.getMessages();
      }
    })
    .catch((err) => console.error(err));

  }

  getMessages() {
    this.messageService.getMessage(this.mascota._id).then((data) => this.mensajes = data);
  }


  submitForm() {
    errorHandler.cleanRestValidations(this);
    console.log(this.mascota);
    this.mascotaService
      .guardarMascota(this.mascota)
      .then(mascota => {
        this.mascota = mascota;
        console.log(mascota);
      })
      .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }

}
