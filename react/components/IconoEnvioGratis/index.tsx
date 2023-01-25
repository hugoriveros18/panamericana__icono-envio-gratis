import React, { useState, useEffect } from 'react';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../../typings/cssHandles';
import './styles.css';
import { Registro } from '../../typings/definitions';
import { IconoEnvioGratisSchema } from '../../schema/IconoEnvioGratisSchema';

const IconoEnvioGratis = () => {

  //CONTEXTO DE PRODUCTO
  const informacionProducto = useProduct();

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //ESTADOS
  const [referencias, setReferencias] = useState<Registro[] | null>(null)
  const [categorias, setCategorias] = useState<string[]>([]);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [colecciones, setColecciones] = useState<string[]>([]);
  const [pathCategorias, setPathCategorias] = useState<string[]>([]);
  const [iconoActivo,setIconoActivo] = useState<boolean>(false);

  //EFECTOS
  useEffect(() => {
    const fecthReferencias = async () => {
      await fetch(`/api/dataentities/EG/search?_fields=estaActivo,fechaInicio,fechaFinal,tipoReferencia,idReferencia`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.vtex.ds.v10+json",
            "REST-Range": "resources=0-100"
        }
      })
        .then(res => res.json())
        .then(res => setReferencias(res))
    }
    fecthReferencias();
  },[])

  useEffect(() => {
    if(referencias) {
      referencias.forEach((referencia) => {
        if(referencia.estaActivo) {
          const fechaHoy = new Date()
          const inputDateInicio = new Date(referencia.fechaInicio.split("+")[0]);
          const inputDateFinal = new Date(referencia.fechaFinal.split("+")[0]);
          if(fechaHoy.getTime() > inputDateInicio.getTime() && fechaHoy.getTime() < inputDateFinal.getTime()) {
            switch(referencia.tipoReferencia) {
              case 'categoria':
                setCategorias([...categorias,referencia.idReferencia]);
                break;
              case 'marca':
                setMarcas([...marcas,referencia.idReferencia]);
                break;
              case 'coleccion':
                setColecciones([...colecciones,referencia.idReferencia])
                break;
            }
          }
        }
      })
    }
  }, [referencias])


  useEffect(() => {
    if(iconoActivo) {
      return
    }
    //Validacion de Colecciones
    if(colecciones.length > 0) {
      const coleccionesProducto = informacionProducto.product.productClusters;
      for(let coleccion of coleccionesProducto) {
        if(colecciones.includes(coleccion.id)) {
          setIconoActivo(true);
          break;
        }
      }
    }
    if(iconoActivo) {
      return
    }
    //Validacion de Marcas
    if(marcas.length > 0) {
      const idMarcaProducto = `${informacionProducto.product.brandId}`;
      if(marcas.includes(idMarcaProducto)) {
        setIconoActivo(true);
      }
    }
    if(iconoActivo) {
      return
    }
    //Validacion de Categorias
    if(categorias.length > 0) {
      const skuIdProducto = informacionProducto.product.sku ? informacionProducto.product.sku.itemId : informacionProducto.selectedItem.itemId;
      const fecthPathCategoria = async (skuId:string) => {
        await fetch(`/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`, {
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/vnd.vtex.ds.v10+json"
          }
        })
          .then(res => res.json())
          .then(res => setPathCategorias(Object.keys(res.ProductCategories)))
      }
      fecthPathCategoria(skuIdProducto)
    }
  },[categorias,marcas,colecciones])


  useEffect(() => {
    if(pathCategorias.length > 0) {
      for(let categoria of categorias) {
        if(pathCategorias.includes(categoria)) {
          setIconoActivo(true);
          break;
        }
      }
    }
  }, [pathCategorias])


  //JSX
  if(iconoActivo) {
    return(
      <div
        className={
          `
          ${informacionProducto.product.sku ? handles['icono-envio-gratis_plp-container'] : handles['icono-envio-gratis_pdp-container']}
          ${(informacionProducto.product.sku === undefined && informacionProducto.selectedItem.images.length > 1) && handles['pdp_carusel-margin']}
          `
        }
      >
        <img
          src="https://panamericana.vteximg.com.br/arquivos/Envio-gratis-icono.png"
          alt="Icono Envio Gratis"
          className={`${handles['icono-envio-gratis-image']}`}
        />
      </div>
    )
  }

  return null;
}

IconoEnvioGratis.schema = IconoEnvioGratisSchema;

export default IconoEnvioGratis;
