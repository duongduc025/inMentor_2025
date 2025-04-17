from sqlalchemy import Column, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
