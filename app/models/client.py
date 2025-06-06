from app.database.db import db
from datetime import datetime

class Client(db.Model):
    __tablename__ = "clients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    #RELACIONES INVERSAS
    orders = db.relationship("Order", backref="clients", lazy=True) 
    #relationship para relacionar tab.
    #si no haces client.orders no lo busca, puedes busacr un cliente aunque tenga varios registros
    def to_dict(self, orders:bool=False):
        client = {
            'id' :self.id,
            'name' : self.name,
            'phone_number': self.phone_number,
            'address': self.address,
            'created_at': self.created_at
        }
        if orders:
            client['orders'] = self.orders
        return client