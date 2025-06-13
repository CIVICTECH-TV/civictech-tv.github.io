---
---
$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var subject = "{{ site.data.sitetext.contact.subject }}";
      
      var emailBody = "お名前: " + name + "\n";
      emailBody += "メールアドレス: " + email + "\n";
      if (phone) {
        emailBody += "電話番号: " + phone + "\n";
      }
      emailBody += "\nメッセージ:\n" + message;
      
      var mailtoUrl = "mailto:{{ site.email }}";
      mailtoUrl += "?subject=" + encodeURIComponent(subject);
      mailtoUrl += "&body=" + encodeURIComponent(emailBody);
      
      window.location.href = mailtoUrl;
      
      var firstName = name;
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>メールクライアントが開きました。送信を完了してください。</strong>");
      $('#success > .alert-success')
        .append('</div>');
      
      setTimeout(function() {
        $('#contactForm').trigger("reset");
      }, 2000);
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
