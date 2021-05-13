import React, { Fragment } from 'react'
import styled from 'styled-components'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import Skeleton from 'react-loading-skeleton'

import Text from 'components/Text'
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

export const ProductComponent = ({ title, amount, price, src, coords, actions, isLoading, ...props }) => (
  <Product {...props}>
    {!coords ? (
      <Fragment>{isLoading ? <Skeleton height={115} /> : <ProductImage src={src} />}</Fragment>
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
      <Column width='100%'>
        {isLoading ? (
          <Column mt={16}>
            <span style={{ width: '50%' }}>
              <Skeleton height={15} />
            </span>
          </Column>
        ) : (
          <Text mt={20}>{title}</Text>
        )}
        <Row width='100%'>
          {isLoading ? (
            <Column width='100%'>
              <Skeleton height={15} width={60} />
            </Column>
          ) : (
            <Fragment>
              {amount && (
                <Text variant='small' mr={20}>
                  <Icon icon='user' width='15px' height='15px' /> {amount}
                </Text>
              )}
              {price && <Text variant='small'>R$ {parseFloat(price).toFixed(2)}</Text>}
            </Fragment>
          )}
        </Row>
      </Column>
      <Column justifyContent='flex-end'>
        <Row ml='auto' width='100%'>
          {isLoading ? (
            <Fragment>
              <Row width='100%' justifyContent='space-between'>
                <span style={{ marginRight: '20px' }}>
                  <Skeleton height={40} width={40} />
                </span>
                <span>
                  <Skeleton height={40} width={40} />
                </span>
              </Row>
            </Fragment>
          ) : (
            <>{actions}</>
          )}
        </Row>
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
