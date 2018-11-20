// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

  var token = null;
  var getToken = () => {
    try {
      token = token || JSON.parse(localStorage.token);
    } catch (e) {}

    console.log(token);

    if (token) { return token }
    token = prompt("Admin token");

    localStorage.token = JSON.stringify(token);

    return token;
  };

  $("#suspend").submit( e => {
    e.preventDefault();
    var form = e.target;
    var toke = getToken();

    var domainOrId = form.querySelector('[name=domain]').value;
    if (!domainOrId) { alert("Please enter a project domain or id"); return }

    var reason = form.querySelector('[name=reason]').value;
    $.post(`https://api.gomix.com/projects/${domainOrId}/suspend?authorization=${toke}`, {
      reason: reason
    });
  });

  $("#unsuspend").submit( e => {
    e.preventDefault();
    var form = e.target;
    var toke = getToken();

    var domainOrId = form.querySelector('[name=domain]').value;
    if (!domainOrId) { alert("Please enter a project domain or id"); return }

    $.post(`https://api.gomix.com/projects/${domainOrId}/unsuspend?authorization=${toke}`);
  });

  $("#delete-custom-domain").submit( e => {
    e.preventDefault();
    var form = e.target;
    var toke = getToken();

    var projectId = form.querySelector('[name=project_id]').value;
    var domain = form.querySelector('[name=domain]').value;
    if (!projectId || !domain) { alert("Please enter a project id and domain to delete"); return }
    
    var request = $.ajax({
      url: `https://api.glitch.com/projects/${projectId}/domains?authorization=${toke}`,
      method: "DELETE",
      data: { "domain" : domain },
    });

    request.done(function( msg ) {
      console.log(msg);
    });

    request.fail(function( jqXHR, textStatus, errorMsg ) {
      console.log( jqXHR.responseJSON );
    });

  });

});
