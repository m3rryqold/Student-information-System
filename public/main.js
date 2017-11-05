window.UIkit = require('uikit')
function e (element) {
    return document.querySelector(element)
}
(()=> {
    let details = document.getElementsByClassName('details')
    for (let x = 0; x < details.length; x++) {    
        details[x].addEventListener('click', () => {
            fetch('/students/details', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'id': details[x].id,
                })
            }).then(res => {
                if(res.ok) return res.json()
            }).then(data => {
                e('.title').innerHTML = data.name
                e('#name').innerHTML = data.name
                UIkit.modal('#see-more').show()
                console.log(data)
            })
        })
    }
})

