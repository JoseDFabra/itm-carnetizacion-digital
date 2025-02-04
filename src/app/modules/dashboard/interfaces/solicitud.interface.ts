import { Estado } from "@shared/enums/estado.enum";

export interface Solicitud {
    id:                 string;
    documento:          string;
    nombres:            string;
    apellidos:          string;
    correo_electronico: string;
    perfiles:           string[];
    estado:             Estado;
    carnet:             string;
    es_activo:          boolean;
    observacion:        null;
    foto:               string;
    acta_de_grado:      null;
    acta_de_inicio:     null;
    creado_en:          Date;
    actualizado_en:     Date;
    telefono:           string;
    facultad:           string;
    tipo_sangre:        string;
}
