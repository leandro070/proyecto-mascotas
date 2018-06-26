import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgDatepickerModule } from "ng2-datepicker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { LoggedIn, routing } from "./app.routes";
import { MascotaComponent } from "./mascota/mascota.component";
import { MascotaService } from "./mascota/mascota.service";
import { NuevaMascotaComponent } from "./mascota/nueva-mascota.component";
import { MenuComponent } from "./menu/menu.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { PerfilService } from "./perfil/perfil.service";
import { ProvinciaService } from "./provincia/provincia.service";
import { FileUploadComponent } from "./tools/image.base64";
import { RegistrarUsuarioComponent } from "./usuario/registrar-usuario.component";
import { UsuarioService } from "./usuario/usuario.service";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PerfilMascotaComponent } from "./perfil-mascota/perfil-mascota.component";
import { PerfilMascotaService } from "./perfil-mascota/perfil-mascota.service";
import { MessageService } from "./perfil-mascota/message.service";
import { MensajesMascotasComponent } from "./mensajes-mascotas/mensajes-mascotas.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PerfilComponent,
    MascotaComponent,
    MenuComponent,
    NuevaMascotaComponent,
    RegistrarUsuarioComponent,
    FileUploadComponent,
    PerfilMascotaComponent,
    MensajesMascotasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgDatepickerModule,
    routing
  ],
  providers: [
    MascotaService,
    UsuarioService,
    ProvinciaService,
    PerfilService,
    LoggedIn,
    PerfilMascotaService,
    MessageService,
    /* Los providers son @Inyectable, la siguiente es una forma de definir un
     provider con un valor constante para poder inyectarlo*/
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
