import React from 'react'
import styled from 'styled-components'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import Text from 'components/Text'
import Button from 'components/Button'
import Row from 'components/Row'
import Column from 'components/Column'
import Icon from 'components/Icon'

import MapIcon from 'assets/Icons/MapPin.svg'
import 'leaflet/dist/leaflet.css'

let pinIcon = L.icon({
  iconUrl: MapIcon,
  iconRetinaUrl: MapIcon,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
})

const ProductComponent = ({ title, amount, price, src, coords, ...props }) => (
  <Product {...props}>
    {!coords ? (
      <ProductImage src={src} />
    ) : (
      coords && (
        <MapContainer
          center={coords}
          zoom={14}
          dragging={false}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{ borderRadius: '15px', width: '100%', height: '120px' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
          />
          <Marker icon={pinIcon} position={coords}></Marker>
        </MapContainer>
      )
    )}
    <Row justifyContent='space-between'>
      <Column>
        <Text mt={20}>{title}</Text>
        <Row>
          {amount && (
            <Text variant='small' mr={20}>
              <Icon icon='user' width='15px' height='15px' /> {amount}
            </Text>
          )}
          {price && <Text variant='small'>R$ {price}</Text>}
        </Row>
      </Column>
      <Column>
        <Button width={100} mt={20} px={10}>
          Entregar
        </Button>
      </Column>
    </Row>
  </Product>
)

const Product = styled.div`
  width: 100%;
  height: 200px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  border: none;
  border-radius: 15px;
  background-color: #cacaca;
  object-fit: cover;
`

export default ProductComponent
