from flask import Flask, request, jsonify, make_response
from models import db, Expense
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'  # Update as needed
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()


# Create
@app.route('/expense', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = Expense(
        amount=data['amount'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        category=data['category'],
        description=data.get('description', '')
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'}), 201

# Read
@app.route('/expense', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([{'id': e.id, 'amount': e.amount, 'date': e.date.isoformat(), 'category': e.category, 'description': e.description} for e in expenses])

# Update
@app.route('/expense/<int:id>', methods=['PUT'])
def update_expense(id):
    data = request.json
    expense = Expense.query.get_or_404(id)
    expense.amount = data.get('amount', expense.amount)
    expense.date = datetime.strptime(data.get('date', expense.date.isoformat()), '%Y-%m-%d').date()
    expense.category = data.get('category', expense.category)
    expense.description = data.get('description', expense.description)
    db.session.commit()
    return jsonify({'message': 'Expense updated successfully'})

# Delete
@app.route('/expense/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get_or_404(id)
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
