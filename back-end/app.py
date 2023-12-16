from flask import Flask, request, jsonify
from models import db, Expense
from flask_migrate import Migrate
from datetime import datetime

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db' 
    migrate = Migrate(app, db)
    db.init_app(app)

    with app.app_context():
        db.create_all()


    # Create
    @app.route('/expense', methods=['POST'])
    def add_expense():
        data = request.json
        if 'amount' not in data or 'date' not in data or 'category' not in data:
            return jsonify({'error': 'Missing data'}), 400
        
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
        if 'amount' not in data or 'date' not in data or 'category' not in data:
            return jsonify({'error': 'Missing data'}), 400
    
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
    

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
