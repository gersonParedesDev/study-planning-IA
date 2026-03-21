"""update resources add source_type text_content

Revision ID: aa02beeb4363
Revises: 9cd71d235378
Create Date: 2026-03-21 10:03:04.166275

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aa02beeb4363'
down_revision: Union[str, Sequence[str], None] = '9cd71d235378'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Crear el enum primero
    resourcesourcetype = sa.Enum('TEXT', 'PDF', 'IMAGE', 'TITLE_ONLY', name='resourcesourcetype')
    resourcesourcetype.create(op.get_bind())

    op.add_column('resources', sa.Column('source_type', sa.Enum('TEXT', 'PDF', 'IMAGE', 'TITLE_ONLY', name='resourcesourcetype'), nullable=True))
    op.add_column('resources', sa.Column('text_content', sa.Text(), nullable=True))
    op.add_column('resources', sa.Column('created_at', sa.DateTime(timezone=True), nullable=True))
    op.alter_column('resources', 'file_url',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('resources', 'filename',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # Setear valor por defecto en filas existentes
    op.execute("UPDATE resources SET source_type = 'PDF' WHERE source_type IS NULL")
    op.execute("UPDATE resources SET created_at = NOW() WHERE created_at IS NULL")

    # Ahora sí hacerlos NOT NULL
    op.alter_column('resources', 'source_type', nullable=False)
    op.alter_column('resources', 'created_at', nullable=False)

def downgrade() -> None:
    op.alter_column('resources', 'filename',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('resources', 'file_url',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('resources', 'created_at')
    op.drop_column('resources', 'text_content')
    op.drop_column('resources', 'source_type')
    sa.Enum(name='resourcesourcetype').drop(op.get_bind())