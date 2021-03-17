window.onload=function(){
    $('.submit').click(function(){
        var surname = $('.surname-find').val();
        var age = $('.age-find').val();
        find(surname, age);
    })
    
    $('.submit-add').click(function(){
        var first_name = $('.imie-add').val();
        var last_name = $('.nazwisko-add').val();
        var postal_code = $('.kod-add').val();
        var street = $('.ulica-add').val();
        var city = $('.miejscowosc-add').val();
        var age = $('.wiek-add').val();
        add(first_name, last_name, postal_code, street, city, age);
    })
    $('.submit-mod').click(function(){
        var first_name = $('.imie-mod').val();
        var last_name = $('.nazwisko-mod').val();
        var postal_code = $('.kod-mod').val();
        var street = $('.ulica-mod').val();
        var city = $('.miejscowosc-mod').val();
        var age = $('.wiek-mod').val();
        var id = $('.id-mod').val();
        add(first_name, last_name, postal_code, street, city, age, id);
    })
    $('.submit-del').click(function(){
        var id = $('.id-del').val();
        del(id);                    
    })

}

function find(surname, age){
    if(surname){
        if(age){
            $.getJSON('http://fronttest.ekookna.pl/', function(data) {
                let users = data['users'];
                for(let user of users){
                    if(data['users'][user]['last_name'].toLowerCase() ==surname.toLowerCase() && data['users'][user]['age']==age){
                        createTable(data['users'][user]);
                    }
                }  
            })
        }
        else{
            $.getJSON('http://fronttest.ekookna.pl/', function(data) {
                let users = data['users'];
                for(let user in users){
                    if(data['users'][user]['last_name'].toLowerCase() ==surname.toLowerCase()){
                        createTable(data['users'][user]);
                    }
                }   
            })
        }
    }
    else{
        alert('wpisz nazwisko');
    }
}

function add(first_name, last_name, postal_code, street, city, age){
    if(first_name && last_name && postal_code && street && city && age){
    
        fetch('http://fronttest.ekookna.pl/user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                postal_code: postal_code,
                street: street,
                city: city,
                age: age
            }),
            mode: 'no-cors'
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    
    }
    else{
        alert('wypelnij wszystkie pola');
    }
}

function mod(first_name, last_name, postal_code, street, city, age, id){
    if(first_name && last_name && postal_code && street && city && age && id){
        fetch('http://fronttest.ekookna.pl/user'+id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                postal_code: postal_code,
                street: street,
                city: city,
                age: age
            }),
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    else{
        alert('wypelnij wszystkie pola');
    }
}

function del(id){
    fetch('http://fronttest.ekookna.pl/user/'+id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}


var content = "<table>"

function createTable(array){
    console.log(array);
    
    content += '<tr><td>' + 'imie' + '</td>' + '<td>' + array['first_name'] + '</td></tr>';
    content += '<tr><td>' + 'nazwisko' + '</td>' + '<td>' + array['last_name'] + '</td></tr>';
    content += '<tr><td>' + 'kod pocztowy' + '</td>' + '<td>' + array['postal_code'] + '</td></tr>';
    content += '<tr><td>' + 'ulica' + '</td>' + '<td>' + array['street'] + '</td></tr>';
    content += '<tr><td>' + 'miejscowość' + '</td>' + '<td>' + array['city'] + '</td></tr>';
    content += '<tr><td>' + 'wiek' + '</td>' + '<td>' + array['age'] + '</td></tr>';
    content += '<tr><td>' + 'id' + '</td>' + '<td>' + array['id'] + '</td></tr>';
    content += "</table>"

    $('.overflow-auto').append(content);
    
    content = "<table>";
}






