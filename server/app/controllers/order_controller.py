from app.database.db import db 
from app.models.order import Order
from app.models.garment import Garment  
from app.models.order_detail import OrderDetail
from app.models.service import service

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id=client_id, user_id=user_id, estimated_delivery_date=estimated_date, total_price=total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_garment(order_id, type, description, notes):
    garment = Garment(order_id=order_id, type=type, description=description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail(garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail







def get_order_detail(order_id):
    #la busqueda que vamos a hacer debe traer 
    #cliente, garement
    #cada garment debe tener du servivio
    order= Order.query.get(order_id)
    order_data = {
        "order_id": order.id,
        "client": order.client.name,
        "status": order.state,
        "garments": []
    }
    garments = Garment.query.filter_by(order_id=order.id)
    for garment in garments:
        garment_data = {
            "type": garment.type,
            "description": garment.description,
            "observations": garment.observations,
            "services": []
        }
        for gs in garment.order_detail:
            service = service.query.get(gs.service_id)
            service_data = {
                "name": service.name,
                "description": service.description,
                "price": service.price
            }
            garment_data["services"].append(service_data)
        order_data["garments"].append(garment_data)
    return order_data
def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.satate = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data = [{
        "id": order.id,
        "client_id": order.client_id,
        "state": order.state,
        "estimated_delivery_date": order.estimated_delivery_date,
        "total": order.total,
        "pagado": order.pagado
    } for order in orders]
    return data

