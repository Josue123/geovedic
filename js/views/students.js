var app = app || {};

app.StudentsView = Backbone.View.extend({
    el: '#student-list',

    initialize: function(initialStudents) {
        this.collection = new app.Students(initialStudents);
        this.render();
    },

    render: function() {
        this.collection.each(function( item ) {
            this.renderStudent(item);
        }, this);
    },

    renderStudent: function(item) {
        var studentView = new app.StudentView({
            model: item
        });
        this.$el.append( studentView.render().el );
    }
});