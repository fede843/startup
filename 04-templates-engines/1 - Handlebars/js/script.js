$().ready(function() {
  $.get("js/profile.json", function(profile) {
    var template = Handlebars.compile($("#page-template").html());
    $("#page").html(template(profile));
  });
});
