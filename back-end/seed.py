from datetime import datetime
from app import create_app
from models import db, Expense

app = create_app()

with app.app_context():
    expenses_data = [
        {
            "date": "2023-12-01",
            "category": "Groceries",
            "amount": 1200.50,
            "description": "Weekly groceries at Supermarket"
        },
        {
            "date": "2023-12-02",
            "category": "Utilities",
            "amount": 600.00,
            "description": "Electricity bill payment"
        },
        {
            "date": "2023-12-03",
            "category": "Transportation",
            "amount": 1595.75,
            "description": "Gas for car"
        },
        {
            "date": "2023-12-05",
            "category": "Entertainment",
            "amount": 5060.00,
            "description": "Movie tickets for family"
        },
        {
            "date": "2023-12-10",
            "category": "Dining",
            "amount": 4065.30,
            "description": "Dinner at Italian restaurant"
        },
        
    ]

    for expense_data in expenses_data:
        expense = Expense(
            date=datetime.strptime(expense_data['date'], '%Y-%m-%d'),
            category=expense_data['category'],
            amount=expense_data['amount'],
            description=expense_data['description']
        )
        db.session.add(expense)

    db.session.commit()
 

print("Data seeding completed successfully!")
