import enum

from app import db
from app.constants import PrStatus


# class PrStatus(enum.Enum):
#     OPEN = "Open"
#     CLOSED = "Closed"
#     MERGED = "Merged"

class PR(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    description = db.Column(db.String(200))
    status = db.Column(db.Enum(PrStatus))
    base_branch = db.Column(db.String(200))
    compare_branch = db.Column(db.String(200))
    author = db.Column(db.String(120), index=True)

    # email = db.Column(db.String(120), index=True, unique=True)
    # password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<PR {}>'.format(self.title)