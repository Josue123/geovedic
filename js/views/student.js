var app = app || {};

app.StudentView = Backbone.View.extend({
    tagName: 'div',
    className: 'studentAddress',
    template: _.template( $('#studentTemplate').html() ),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }

});