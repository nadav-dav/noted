$(function(){
    var services = [];

    addSeparator("Security");
    addService("Login" ,"/services/login", "POST", {
        email   : "admin@noted.com",
        password: "123"
    });
    addService("Logout" ,"/services/logout", "DELETE", {});




    addSeparator("Notes");
    addCrudServicesFor("note", "/services/note", {
        hint    :   "somewhere",
        text    :   "CONTENT",
        location:   [1,-1]
    });
    addService("Find notes by location" ,"/services/note/location", "POST",
        {company: "enter company's id here", location: [1, -1]});

    addService("Find notes by user" ,"/services/note/user/:id", "GET",
        {id: "enter user's id"}
    );

    addService("Find notes of a company" ,"/services/note/company/:id", "GET",
        {id: "enter company's id"}
    );

    addSeparator("Votes");
    addCrudServicesFor("vote", "/services/vote", {
        note    :   "note id",
        type    :   1
    });
    addService("Find users who voted on a note" ,"/services/voting/note/:id", "GET",
        {id: "enter note's id"}
    );

    addService("Find notes who were voted by a user" ,"/services/voting/user/:id", "GET",
        {id: "enter user's id"}
    );





    addSeparator("Company");
    addCrudServicesFor("company", "/services/company", {
        name    : "my company"
    });

    addSeparator("Users");
    addCrudServicesFor("user", "/services/user", {
        email   :   "anotheremail@company.com",
        name    :   "Boo Far",
        password:   "my-new-pass"
    });
    addService("Find users of a company" ,"/services/user/company/:id", "GET",
        {id: "enter company's id"}
    );















    function addSeparator(text){
        services.push({type: "separator", text: text})
    }

    function addService(name, endpoint, method, payload){
        services.push({
            name: name, endpoint: endpoint, method: method, payload: payload
        })
    }

    function addCrudServicesFor(name, endpoint, payload){
        // CREATE
        services.push({
            name    : "Create a "+name,
            endpoint: endpoint,
            method  : "POST",
            payload : payload
        });

        // READ
        services.push({
            name    : "Read a "+name+" by id",
            endpoint: endpoint+"/:id",
            method  : "GET",
            payload : {
                id: "enter "+name+"'s id here"
            }
        });

        // UPDATE
        services.push({
            name    : "Updated a "+name+" by id",
            endpoint: endpoint+"/:id",
            method  : "PUT",
            payload : $.extend({id: "enter "+name+"'s id here"},payload)
        });


        // DELETE
        services.push({
            name    : "Delete a "+name+" by id",
            endpoint: endpoint+"/:id",
            method  : "DELETE",
            payload : {
                id: "enter "+name+"'s id here"
            }
        });
    }

    var $menu = $("#menu");
    var $payload = $("#payload");
    var $execute = $("#execute");
    var $url = $("#url");
    var $output = $("#output");
    var selectedButton;
    var selectedService;

    services.forEach(function(service){
        if (service.type == "separator"){
            $menu.append('<h3>'+service.text+'</h3>'+'</hr>');
        }else {
            var button = $('<button type="button" class="btn btn-default">'+service.name+'</button>');
            $menu.append(button);
            button.click(function(){
                $output.text("");
                if(selectedButton){
                    selectedButton.addClass("btn-default").removeClass("btn-info");
                }
                selectedButton = button;
                selectedButton.removeClass("btn-default").addClass("btn-info");
                $payload.val(JSON.stringify(service.payload,0,4));
                $url.text(service.method+" "+service.endpoint);
                selectedService = service;
            })
        }
    });

    $execute.click(function(){
        if (!selectedService) return;
        var payload = JSON.parse($payload.val());
        var endpoint = selectedService.endpoint;
            endpoint = endpoint.replace(":id", payload.id);
        $.ajax({
            url: endpoint,
            method: selectedService.method,
            dataType: "json",
            processData: false,
            contentType: "application/json",
            data: selectedService.method !== "GET" ? JSON.stringify(payload) : undefined
        }).done(function(data, textStatus, jqXHR) {
            jqXHR.responseText = undefined;
            $output.text(JSON.stringify(jqXHR,0,4));
        }).fail(function(jqXHR, textStatus, errorThrown){
            $output.text(JSON.stringify(jqXHR,0,4));
        })
    })
});