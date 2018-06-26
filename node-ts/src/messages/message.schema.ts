"use strict";

import * as mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  message: string;
  pet: mongoose.Schema.Types.ObjectId;

  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Mensajes
 */
export let MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    default: "",
    required: "Nombre es requerido"
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: "Mascota es requerido"
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "messages" });

/**
 * Antes de guardar
 */
MessageSchema.pre("save", function (this: IMessage, next) {
  this.updated = Date.now();

  next();
});

export let Message = mongoose.model<IMessage>("Message", MessageSchema);
