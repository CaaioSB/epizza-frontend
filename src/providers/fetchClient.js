import { OAuth2 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'helpers'

const options = {
  baseURL: 'http://localhost:2020',
  access_token_name: ACCESS_TOKEN,
  refresh_token_name: REFRESH_TOKEN
}

const instance = OAuth2.createInstance(options)

export default instance
