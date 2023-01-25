type Registro = {
  tipoReferencia: string
  idReferencia: string
  fechaInicio: string
  fechaFinal: string
  estaActivo: boolean
}

type ResumenReferencias = {
  categorias: string[]
  marcas: string[]
  colecciones: string[]
}

type EnvioGratisProps = {
  referencias: Registro[]
}

type IconoRenderComponentProps = {
  children: any
}

export { EnvioGratisProps, ResumenReferencias, Registro, IconoRenderComponentProps }
