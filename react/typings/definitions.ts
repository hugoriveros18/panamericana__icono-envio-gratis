type Registro = {
  tipoReferencia: string
  idReferencia: string
  fechaInicio: string
  fechaFinal: string
  urlImagenIcono: string
  estaActivo: boolean
}

type EnvioGratisProps = {
  referencias: Registro[]
}

type ReferenciaImagen = {
  id: string
  urlImagen: string
}

export { EnvioGratisProps, Registro, ReferenciaImagen }
