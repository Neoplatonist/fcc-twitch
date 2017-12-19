const users = [ 
  "ESL_SC2",
  "OgamingSC2", 
  "cretetion", 
  "freecodecamp", 
  "storbeck", 
  "habathcx", 
  "RobotCaleb", 
  "noobs2ninjas"
]

let streams = new Array()

// User Logo
// UserName
// Stream Description
// Online || Offline
// Create a clickable link that takes you to their channel

const url = 'https://wind-bow.glitch.me/twitch-api'

function initialize() {
  const url = 'https://wind-bow.glitch.me/twitch-api'

  users.map((v, k) => {
    let fakeURL = url + '/streams/' + v
    getJSON(url, fakeURL, v)
      .then(data => {
        console.log(data)
        console.log(streams.length)
        if (streams.length === 8) {
          render()
        }
      })
  })
}

function getJSON(base, url, usr) {
  return new Promise (function(resolve, reject) {
    fetch(url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.stream !== null) {
        streams.push({
          status: data.stream.channel.status,
          link: 'https://twitch.tv/' + usr,
          logo: data.stream.channel.logo,
          user: usr
        })
      } else {
        let fakeURL = base + '/users/' + usr
  
        fetch(fakeURL)
          .then(res => {
            return res.json()
          })
          .then(dat => {
            streams.push({
              status: 'Offline',
              link: 'https://twitch.tv/' + usr,
              logo: dat.logo,
              user: usr
            })
          })
          .then(() => {
            resolve('Finished')
          })
          .catch(err => {
            console.log('ERROR: ' + err)
            reject(err)
          })
      }
    })
    .catch(err => {
      console.log('ERROR: ' + err)
    })
  })
}

function render() {
  console.log('Made it to render')
  console.log(streams)

  streams.sort().map((v, k) => {
    document.getElementById('users').innerHTML +=
      '<li>' + '<img class="logo" src=\"' + v.logo + '\"/> ' + v.user + '</li>'
  })
}

(function() {
  initialize()
})()

function test() {
  console.log('Running Tests...')
  if (streams.length > 0) {
    console.log(streams)
    if (streams[0].link === 'https://twitch.tv/ESL_SC2') {
      console.log('Passes Link')
    } else {
      console.log('Fails Link')
    }
  
    if (streams[0].logo === 'https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg') {
      console.log('Passes Logo')
    } else {
      console.log('Fails Logo')
    }
  
    if (streams[0].status === 'RERUN: HyuN vs. Patience - Open Bracket - IEM Cologne - StarCraft 2') {
      console.log('Passes Status')
    } else {
      console.log('Fails Status')
    }
  
    if (streams[0].user === 'ESL_SC2') {
      console.log('Passes User')
    } else {
      console.log('Fails User')
    }
  } else {
    console.log('ERROR: Stream Array is Empty')
  }
  
}