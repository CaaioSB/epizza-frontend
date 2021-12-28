export const validateCPF = cpf => {
  let sum
  let rest
  sum = 0
  if (typeof cpf === 'undefined' || cpf.length !== 11) return false
  if (cpf == '00000000000') return false

  for (i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(cpf.substring(10, 11))) return false
  return true
}

export const distanceMatrixService = (origins, destinations, callback) => {
  var service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix(
    {
      origins: origins,
      destinations: destinations,
      travelMode: 'DRIVING'
    },
    callback
  )
}

export const FormatMoney = (campo, tammax = 20, teclapres, caracter) => {
  let tecla = 0

  if (teclapres == null || teclapres == 'undefined') {
    tecla = -1
  } else {
    tecla = teclapres.keyCode
  }

  if (caracter == null || caracter == 'undefined') {
    caracter = '.'
  }

  let vr = campo.value
  if (caracter != '') {
    vr = troca(vr, caracter, '')
  }
  vr = troca(vr, '/', '')
  vr = troca(vr, ',', '')
  vr = troca(vr, '.', '')

  let tam = vr.length
  if (tecla > 0) {
    if (tam < tammax && tecla != 8) {
      tam = vr.length + 1
    }

    if (tecla == 8) {
      tam = tam - 1
    }
  }
  if (tecla == -1 || tecla == 8 || (tecla >= 48 && tecla <= 57) || (tecla >= 96 && tecla <= 105)) {
    if (tam <= 2) {
      campo.value = vr
    }
    if (tam > 2 && tam <= 5) {
      campo.value = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam)
    }
    if (tam >= 6 && tam <= 8) {
      campo.value = vr.substr(0, tam - 5) + caracter + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam)
    }
    if (tam >= 9 && tam <= 11) {
      campo.value =
        vr.substr(0, tam - 8) +
        caracter +
        vr.substr(tam - 8, 3) +
        caracter +
        vr.substr(tam - 5, 3) +
        ',' +
        vr.substr(tam - 2, tam)
    }
    if (tam >= 12 && tam <= 14) {
      campo.value =
        vr.substr(0, tam - 11) +
        caracter +
        vr.substr(tam - 11, 3) +
        caracter +
        vr.substr(tam - 8, 3) +
        caracter +
        vr.substr(tam - 5, 3) +
        ',' +
        vr.substr(tam - 2, tam)
    }
    if (tam >= 15 && tam <= 17) {
      campo.value =
        vr.substr(0, tam - 14) +
        caracter +
        vr.substr(tam - 14, 3) +
        caracter +
        vr.substr(tam - 11, 3) +
        caracter +
        vr.substr(tam - 8, 3) +
        caracter +
        vr.substr(tam - 5, 3) +
        ',' +
        vr.substr(tam - 2, tam)
    }
  }
}

function troca(str, strsai, strentra) {
  while (str.indexOf(strsai) > -1) {
    str = str.replace(strsai, strentra)
  }
  return str
}
