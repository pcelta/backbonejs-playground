var ItemView = Backbone.View.extend({
	el: $('.list-table'),
	initialize: function() {
		this.render();
	},
	render: function() {
		var date = new Date();
		var mili = date.getMilliseconds();

		var id = mili + this.model.get("firstName") + '-' + 
			this.model.get("lastName") + '-' + 
			this.model.get("userName");

		html = '<tr class="'+ id +'">';
		html += '<td data-name="firstName">'+ this.model.get("firstName")+'</td>';
		html += '<td data-name="lastName">'+ this.model.get("lastName")+'</td>';
		html += '<td data-name="userName">'+ this.model.get("userName")+'</td>';					
		html += '<td><button type="button" data-row-id="'+ id +'"" class="btn btn-info btn-edit">Edit</button></td></tr> ';					

		$(this.el).append(html);
	}
});

var NewUserView = Backbone.View.extend({
	el: $('.new-user'),
	initialize: function() {
		this.render();
	},
	events: {
		submit: "submit",
		'click .btn-edit': "edit"
	},
	render: function() {

		html = '<form>' +
				'<div class="form-group">' +
					'<label for="firstName">First Name</label>' +
					'<input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name">' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="lastName">Last Name</label>' +
					'<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name">' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="userName">User Name</label>' +
					'<input type="text" class="form-control" id="userName" name="userName" placeholder="User Name">' +
				'</div>' +
				'<button type="submit" class="btn btn-default">Submit</button>' +
			'</form>';

		$(this.el).append(html);
	},
	submit: function(e) {
		var firstName = this.$(e.target).find('#firstName').val();
		var lastName = this.$(e.target).find('#lastName').val();
		var userName = this.$(e.target).find('#userName').val();

		var user = new UserModel({firstName: firstName, lastName: lastName, userName: userName});
		var newItemView = new ItemView({model: user});

		this.$(e.target).find('input').each(function() {
			$(this).val('');
		});

		return false;
	},
	edit: function(e) {
		console.log('called the zuu');
		this.$(e.target).find("td").each(function() {

			var attributeName = $(this).data('name');
			$('form #' + attributeName).val($(this).html())
		});
	}
});
