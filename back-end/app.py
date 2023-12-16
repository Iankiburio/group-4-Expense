
from flask import Flask, render_template, redirect, url_for, flash, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from flask_migrate import Migrate
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define models outside of the app context
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

# Registration form
class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6, max=30)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

# Login form
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6, max=30)])
    submit = SubmitField('Login')

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        with current_app.app_context():
            user = User(username=form.username.data, password=hashed_password)
            db.session.add(user)
            db.session.commit()
        flash('Your account has been created! You are now able to log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

# ... (Other routes remain unchanged)

# Terminal-based menu
def display_menu():
    print("Options:")
    print("1. Create an account")
    print("2. Login")
    print("3. Quit")

def create_account():
    with app.app_context():
        username = input("Enter username: ")
        password = input("Enter password: ")
        hashed_password = generate_password_hash(password)
        user = User(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        print(f"Account created for {username}")

def user_login():
    with app.app_context():
        username = input("Enter username: ")
        password = input("Enter password: ")
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            print(f"Login successful for {username}")
        else:
            print("Login unsuccessful. Please check your username and password.")

if __name__ == '__main__':
    while True:
        display_menu()
        choice = input("Enter your choice (1-3): ")
        if choice == '1':
            create_account()
        elif choice == '2':
            user_login()
        elif choice == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a valid option (1-3).")
