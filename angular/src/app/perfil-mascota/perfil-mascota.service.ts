
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class PerfilMascotaService extends RestBaseService {
  private perfilUrl = "/profile";
  private imagenUrl = "/image";

  constructor(private http: Http, private securityService: UsuarioService) {
    super();
  }



  guardarImagen(value: Image): Promise<Image> {
    return this.http
      .post(
        PerfilMascotaService.serverUrl + this.imagenUrl,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Image;
      })
      .catch(this.handleError);
  }
}

export interface Perfil {
  _id: string;
  name: string;
  province: string;
  email: string;
  address: string;
  phone: string;
  picture: string;
}

export interface Image {
  id?: string;
  image: string;
}
