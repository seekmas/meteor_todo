Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    var DateFormats = {
        simple: "YYYY/MM/DD",
        normal: "dddd DD.MM.YYYY HH:mm"
    };

    UI.registerHelper("formatDate", function(datetime, format) {
        if (moment) {
            f = DateFormats[format];
            return moment(datetime).format(f);
        }
        else {
            return datetime;
        }
    });

    Template.body.helpers({
        tasks: function() {
            return Tasks.find({} , {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-task": function(event) {
            var text = event.target.text.value;
            Tasks.insert({
                text: text ,
                owner: Meteor.userId() ,
                username: Meteor.user().username ,
                createdAt: new Date()
            });
            event.target.text.value= "";
            return false;
        }
    });

    console.log(Meteor.user());

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
