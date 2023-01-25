const IconoEnvioGratisSchema = {
  "title": "Configuracion Icono de Envio Gratis",
  "description": "Configuracion general para definir que productos van a mostrar el icono de envio gratis",
  "type": "object",
  "properties": {
    "referencias": {
      "title": "Lista de referencias",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "tituloReferencia": {
            "title": "Nombre de referencia",
            "type": "string",
          },
          "tipoReferencia": {
            "title": "Tipo de referencia",
            "type": "string",
            "default": "Categoria",
            "enum": [
              "categoria",
              "marca",
              "coleccion"
            ]
          },
          "idRefencia": {
            "title": "Id de Referencia",
            "type": "string"
          },
          "fechaInicio": {
            "title": "Fecha de inicio",
            "type": "string",
            "widget": {
              "ui:widget": "date-time"
            }
          },
          "fechaFinal": {
            "title": "Fecha final",
            "type": "string",
            "widget": {
              "ui:widget": "date-time"
            }
          },
          "EstaActivo": {
            "title": "Esta activo el icono?",
            "type": "boolean"
          }
        }
      }
    }
  },
  "required": [
    "tituloReferencia",
    "tipoReferencia",
    "idRefencia",
    "fechaInicio",
    "fechaFinal",
    "EstaActivo"
   ]
}

export { IconoEnvioGratisSchema }
