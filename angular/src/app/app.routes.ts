import { Injectable, ModuleWithProviders } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from "@angular/router";
import { MascotaComponent } from "./mascota/mascota.component";
import { NuevaMascotaComponent } from "./mascota/nueva-mascota.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { RegistrarUsuarioComponent } from "./usuario/registrar-usuario.component";
import { UsuarioService } from "./usuario/usuario.service";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PerfilMascotaComponent } from "./perfil-mascota/perfil-mascota.component";
import { MensajesMascotasComponent } from "./mensajes-mascotas/mensajes-mascotas.component";

@Injectable()
export class LoggedIn implements CanActivate {
    constructor(private router: Router, private auth: UsuarioService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.usuarioLogueado) {
            return true;
        } else {
            this.router.navigate(["/"]);
            return false;
        }
    }
}

// Route Configuration
export const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "perfilUsuario", component: PerfilComponent, canActivate: [LoggedIn] },
    { path: "registrarUsuario", component: RegistrarUsuarioComponent },
    { path: "mascotas", component: MascotaComponent, canActivate: [LoggedIn] },
    { path: "nuevaMascota/:id", component: NuevaMascotaComponent, canActivate: [LoggedIn] },
    { path: "nuevaMascota", component: NuevaMascotaComponent, canActivate: [LoggedIn] },
    { path: "perfilMascota/:mascotaId", component: PerfilMascotaComponent, canActivate: [LoggedIn]},
    { path: "mensajesMascotas", component: MensajesMascotasComponent, canActivate: [LoggedIn]}


];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
