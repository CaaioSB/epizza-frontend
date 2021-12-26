import React from 'react'
import styled from 'styled-components'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import Image from 'components/Image'
import Row from 'components/Row'
import Column, { ColumnResponsive } from 'components/Column'
import Text from 'components/Text'
import Grid from 'components/Grid'

import 'leaflet/dist/leaflet.css'
import MapIcon from 'assets/Icons/MapPin.svg'

let pinIcon = L.icon({
  iconUrl: MapIcon,
  iconRetinaUrl: MapIcon,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
})

export const ProductDetailsComponent = ({ actions, coords, src, quantity, name, items, description, ...props }) => {
  return (
    <ProductDetails>
      <ColumnResponsive height='100%'>
        <Column minWidth='200px' height='100%'>
          {!coords ? (
            <Image
              height={200}
              borderRadius='15px 0 0 15px'
              style={{ objectFit: 'cover' }}
              src='https://www.jornaldafronteira.com.br/wp-content/uploads/2019/07/5d11589e51f93-10.jpg'
            />
          ) : (
            coords && (
              <MapContainer
                center={coords}
                zoom={14}
                dragging={false}
                scrollWheelZoom={false}
                zoomControl={false}
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  minHeight: '200px',
                  height: '100%'
                }}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
                />
                <Marker icon={pinIcon} position={coords}></Marker>
              </MapContainer>
            )
          )}
        </Column>
        <Column width='100%' p={20}>
          <Row>
            <Text fontWeight={600}>{quantity}</Text>
            <Text fontWeight={500} mx={10}>
              x
            </Text>
            <Text fontWeight={600}>{name}</Text>
          </Row>
          <Row height='100%' mt={20}>
            <Column width='100%'>
              <Grid height='100%'>
                <Column>
                  {items.map(item => (
                    <Text>{item}</Text>
                  ))}
                </Column>
                <Column justifyContent='space-between'>
                  <Row>{description}</Row>
                  <Row alignSelf='flex-end'>{actions}</Row>
                </Column>
              </Grid>
            </Column>
          </Row>
        </Column>
      </ColumnResponsive>
    </ProductDetails>
  )
}

const ProductDetails = styled.div`
  width: 100%;
  min-height: 200px;
  height: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
`

export default ProductDetailsComponent
