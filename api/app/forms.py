from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class PrForm(FlaskForm):
    class Meta:
        csrf = False

    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description')
    base_branch = StringField('Merge branch', validators=[DataRequired()])
    compare_branch = StringField('Into branch', validators=[DataRequired()])

    # add some validators here...