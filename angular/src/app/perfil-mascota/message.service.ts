
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class MessageService extends RestBaseService {
  private perfilUrl = "/profile";
  private messageUrl = "/message";
  private messageByPetURL = "/message-by-pet";
  private allMessages = "/messages";

  constructor(private http: Http, private securityService: UsuarioService) {
    super();
  }

  sendMessage(value: Message): Promise<Message> {
    return this.http
      .post(
        MessageService.serverUrl + this.messageUrl,
        JSON.stringify(value),
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Message;
      })
      .catch(this.handleError);
  }

  getMessage(value: string): Promise<Message[]> {
    return this.http
      .get(
        MessageService.serverUrl + this.messageByPetURL + "/" + value,
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Message[];
      })
      .catch(this.handleError);
  }

  getAllMessage(): Promise<Message[]> {
    return this.http
      .get(
        MessageService.serverUrl + this.allMessages,
        this.getRestHeader()
      )
      .toPromise()
      .then(response => {
        return response.json() as Message[];
      })
      .catch(this.handleError);
  }
}



export interface Message {
  message: string;
  _id?: string;
  pet: string;
}

