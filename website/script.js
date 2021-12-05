const api_endpoint = 'https://c4s1pb1xef.execute-api.us-west-2.amazonaws.com/api/'

let currentPage = 'home-page'
window.history.pushState({'link': 'link-to-home'}, null, currentPage)

function showConfirmation() {
  document.getElementById(currentPage).hidden = true
  document.getElementById('thanks-page').hidden = false
  currentPage = 'thanks-page'
}

function composeData(formName) {
  const fields = {
    'donorForm': ['name', 'email', 'phone', 'location', 'message'],
    'delivererForm': ['name', 'phone', 'email', 'txtCity', 'txtZip']
  }

  const data = {}
  for (const field of fields[formName].values()) {
    const selector = '#' + formName + ' #' + field
    data[field] = document.querySelector(selector).value
  }
  return data
}

function submitData(formName) {
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

function formatObject(payload) {
  let str = ''
  for (const { data } of payload.values()) {
    str += '<ul>'
    for (const [key, value] of Object.entries(data)) {
      str += `<li>${key}: ${value}</li>`
    }
    str += '</ul>'
  }
  return str
}

function showDataOnAdminPage(payload) {
  if (payload['wrong-password']) {
    document.getElementById('admin-data').innerText = 'Wrong Password'
  }
  else {
    document.getElementById('admin-data').innerHTML = formatObject(payload)
  }
}

function getData(password) {
  return fetch(api_endpoint + 'items/admin/' + password).then(response => response.json())
}

function openPage(elem) {
  const buttonIdToSectionMap = {
    'link-to-donor': 'donors-page',
    'link-to-deliverer': 'deliverers-page',
    'link-to-home': 'home-page',
    'link-to-admin': 'admin-page',
  }
  const page = buttonIdToSectionMap[elem.id]
  window.history.pushState({'link': elem.id}, null, page)
  document.getElementById(currentPage).hidden = true
  document.getElementById(page).hidden = false
  currentPage = page
  if (elem.id == 'link-to-admin') {
    const password = prompt('Password', '')
    getData(password).then(showDataOnAdminPage)
  }
}

window.onpopstate = (event) => {
  const link = event.state['link'];
  const elem = document.createElement("div");
  elem.id = link;
  openPage(elem);
}