"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IMessage, Message } from "./message.schema";

/**
 * Retorna los datos de la mascota
 */
export interface IReadRequest extends IUserSessionRequest {
  message: IMessage;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.message);
}

/**
 * @apiDefine IMensajeResponse
 *
 * @apiSuccessExample {json} Mensaje
 *    {
 *      "message": "Mensaje a enviar",
 *      "pet": "Id de mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }
 */

/**
 * @api {post} /message Crear Mascota
 * @apiName Crear Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Crea una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

/**
 * @api {put} /pet/:petId Actualizar Mascota
 * @apiName Actualizar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Actualiza los datos de una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IUpdateRequest extends IUserSessionRequest {
  message: IMessage;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.message) {
    req.check("message", "Ingrese mínimo un caracter").isLength({ min: 1});
    req.sanitize("message").escape();
  }
  if (req.body.pet) {
    req.sanitize("pet").escape();
  }
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let message = req.message;

  if (!message) {
    message = new Message();
    message.pet = req.body.pet;
  }

  if (req.body.message) {
    message.message = req.body.message;
  }

  message.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(message);
  });
}

/**
 * @api {delete} /pet/:petId Eliminar Mascota
 * @apiName Eliminar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Eliminar una mascota.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  message: IMessage;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const message = <IMessage>req.message;

  message.enabled = false;
  message.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

/**
 * @api {get} /pet Listar Mascota
 * @apiName Listar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Obtiene un listado de las mascotas del usuario actual.
 *
 * @apiSuccessExample {json} Mascota
 *  [
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "user": "Id de usuario",
 *      "birthDate": date (DD/MM/YYYY),
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */

/**
 * @api {put} /pet/:petId Buscar Mascota
 * @apiName Buscar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Busca una mascota por id.
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IMessageRequest extends IUserSessionRequest {
    menssage: IMessage[];
}
export function findByPetID(req: IMessageRequest, res: express.Response, next: NextFunction) {
  const id = req.params.petId;
  console.log(id);
  Message.find({
    pet: escape(id),
    enabled: true
  },
    function (err, message) {
      if (err) return errorHandler.handleError(res, err);

      if (!message) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar la mascota " + id);
      }
      res.json(message);
    });
}
export function findByCurrentPet(req: IUserSessionRequest, res: express.Response, next: NextFunction) {

  Message.find({
    user: req.user._id,
    enabled: true
  }).exec(function (err, pets) {
    if (err) return next();
    res.json(pets);
  });
}
export interface IFindByIdRequest extends express.Request {
  message: IMessage;
}

export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.messageId;

  Message.findOne({
    _id: escape(id),
    enabled: true
  },
    function (err, message) {
      if (err) return errorHandler.handleError(res, err);

      if (!message) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar el mensaje " + id);
      }

      req.message = message;
      next();
    });
}

/**
 * Autorización, el único que puede modificar el mascota es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  message: IMessage;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.message.pet as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}
export interface IFindAllMessage extends IUserSessionRequest {
  message: IMessage[];
}
export function findAllMessage(req: IFindAllMessage, res: express.Response, next: NextFunction) {
  Message.find({
    enabled: true
  }).exec(function (err, pets) {
    if (err) return next();
    res.json(pets);
  });
}