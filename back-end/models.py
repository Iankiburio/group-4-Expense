from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    category = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))

    def __repr__(self):
        return f"<Expense {self.id}>"