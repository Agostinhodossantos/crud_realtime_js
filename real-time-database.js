var userList = document.getElementById('userList');
var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');

// Botoes
var addButton = document.getElementById('addButton');
var delButton = document.getElementById('delButton');

// condicoes

let editando = false




// Ao clicar no botão

addButton.addEventListener('click', function () {
    if (!editando)
        create(nameInput.value, ageInput.value);

});



function create(name, age) {
    var data = {
        nome: name,
        idade: age
    };

    return firebase.database().ref().child('users').push(data);
}


//delBtn.onclick = (remover(item.key))

firebase.database().ref('users').on('value', function(snapshot){
    userList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode('Nome: ' + item.val().nome + ' - ' +' Idade: ' + item.val().idade));

        var delBtn = document.createElement('button');
        delBtn.textContent= "Excluir";

        delBtn.addEventListener('click', function () {
            remover(item.key);
        });

        var upBtn = document.createElement('button');
        upBtn.textContent= "Editar";

        userList.appendChild(li);
        userList.appendChild(delBtn);
        userList.appendChild(upBtn);
    });
});


function remover(key) {
   // const key = "-LrQHurF6khXrBwLsRLj";
    console.log("Excluiu id: " + key)
   firebase.database().ref('users/' + key).remove();
}

function getAll() {

    let db = firebase.database().ref('users');
    db.on("value", function(data){

        data.forEach(function (item) {
            var itemVal = item.val();
            //console.log('Nome: ' + itemVal.nome  + ' Idade:' + itemVal.idade);
            console.log(item.key);
        })

    })
    
}

function getOne() {
    let key = "-LrQI_zppV-AdUeV16ku";

    let db = firebase.database().ref('users/' + key);
    db.on("value", function(data){
        var itemVal = data.val().nome;
        console.log('Nome: ' + itemVal);
    })
}

function update(key, name, idade) {
    //const id ="-LrQI_zppV-AdUeV16ku"
 
    var data = {
        nome: name,
        idade: idade
    }
    let db = firebase.database().ref("users/" + key);

    db.set(data);


}








/*
firebase.database().ref('users').on('value', function(snapshot){
    //userList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().nome + ': ' + item.val().idade));
        userList.appendChild(li);
    });
});

*/



/*

function remover() {
    const key = "-LrQHurF6khXrBwLsRLj";
    console.log("foi")
   firebase.database().ref('users/' + key).remove();
}
*/