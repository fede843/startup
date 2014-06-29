$().ready(function() {
  $.get("js/profile.json", function(profile) {

    var html = $("#page-template").html();
    var template = dust.compile(html, "myTemplate");
    dust.loadSource(template);
    dust.render("myTemplate", profile, function(err, htmlString) {
      $("#page").html(htmlString);
    });
  });
});
