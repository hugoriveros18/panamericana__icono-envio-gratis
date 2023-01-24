type Registro = {
  tituloReferencia: string
  tipoReferencia: string
  idReferencia: string
  fechaInicio: string
  fechaFinal: string
  EstaActivo: boolean
}

type ResumenReferencias = {
  categorias: string[]
  marcas: string[]
  colecciones: string[]
}

type EnvioGratisProps = {
  referencias: Registro[]
}

export { EnvioGratisProps, ResumenReferencias, Registro }
