const api_endpoint = 'https://c4s1pb1xef.execute-api.us-west-2.amazonaws.com/api/'

let currentPage = 'home-page'

const showConfirmation = () => {
  document.getElementById(currentPage).hidden = true
  document.getElementById('thanks-page').hidden = false
  currentPage = 'thanks-page'
}

const composeData = (formName) => {
  const fields = {
    'donorForm': ['name', 'email', 'phone', 'location', 'message'],
    'delivererForm': ['name', 'phone', 'email', 'txtCity', 'txtZip']
  }

  const data = {}
  for (const field of fields[formName].values()) {
    const selector = '#' + formName + ' #' + field;
    data[field] = document.querySelector(selector).value
  }
  return data
}

const submitData = (formName) => {
  const data = composeData(formName)

  fetch(api_endpoint + 'items', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => console.log(data))

  showConfirmation()
}

const formatObject = (payload) => {
  let str = '';
  for (const { data } of payload.values()) {
    str += '<ul>'
    for (const [key, value] of Object.entries(data)) {
      str += `<li>${key}: ${value}</li>`
    }
    str += '</ul>'
  }
  return str;
}

const showDataOnAdminPage = (payload) => {
  document.getElementById('admin-page').innerHTML = formatObject(payload)
}

const getData = () =>
  fetch(api_endpoint + 'items').then(response => response.json())

const openPage = (elem) => {
  const buttonIdToSectionMap = {
    'link-to-donor': 'donors-page',
    'link-to-deliverer': 'deliverers-page',
    'link-to-home': 'home-page',
    'link-to-admin': 'admin-page',
  }
  const page = buttonIdToSectionMap[elem.id]
  document.getElementById(currentPage).hidden = true
  document.getElementById(page).hidden = false
  currentPage = page
  if (elem.id == 'link-to-admin') {
    getData().then(showDataOnAdminPage)
  }
}

// document.getElementsByClassName('button-looks-like-a-link').onclick = openPage