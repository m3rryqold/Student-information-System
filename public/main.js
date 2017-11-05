// window.UIkit = "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.33/js/uikit.min.js"
// function e (element) {
//     return document.querySelector(element)
// }
// (()=> {
//     let details = document.getElementsByClassName('details')
//     for (let x = 0; x < details.length; x++) {    
//         details[x].addEventListener('click', () => {
//             fetch('/students/details', {
//                 method: 'post',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     'id': details[x].id,
//                 })
//             }).then(res => {
//                 if(res.ok) return res.json()
//             }).then(data => {
//                 e('.mtitle').innerHTML = data.name
//                 e('#course').innerHTML = data.course
//                 UIkit.modal('#see-more').show()
//                 console.log(data)
//             })
//         })
//     }
// })

