$().ready(function() {
  $.get("js/profile.json", function(profile) {
    var template = _.template($("#page-template").html());
    var htmlContent = template(profile);
    $("#page").html(htmlContent);
  });
});
