from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.route import Route
from app.schemas.route import RouteCreate, RouteUpdate, RouteResponse

router = APIRouter(prefix="/routes", tags=["routes"])


@router.get("/", response_model=list[RouteResponse])
async def list_routes(
    active_only: bool = True,
    session: Session = Depends(get_session),
):
    """List all routes."""
    query = select(Route)
    if active_only:
        query = query.where(Route.active == True)
    query = query.order_by(Route.sort_order, Route.id)
    routes = session.exec(query).all()
    return routes


@router.get("/{slug}", response_model=RouteResponse)
async def get_route(slug: str, session: Session = Depends(get_session)):
    """Get a route by slug."""
    route = session.query(Route).filter(Route.slug == slug).first()
    if not route:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Route not found",
        )
    return route


@router.post("/", response_model=RouteResponse, status_code=status.HTTP_201_CREATED)
async def create_route(
    route_data: RouteCreate,
    session: Session = Depends(get_session),
):
    """Create a new route (admin only)."""
    route = Route.model_validate(route_data)
    session.add(route)
    session.commit()
    session.refresh(route)
    return route


@router.patch("/{slug}", response_model=RouteResponse)
async def update_route(
    slug: str,
    route_data: RouteUpdate,
    session: Session = Depends(get_session),
):
    """Update a route (admin only)."""
    route = session.query(Route).filter(Route.slug == slug).first()
    if not route:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Route not found",
        )

    update_data = route_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(route, key, value)

    session.add(route)
    session.commit()
    session.refresh(route)
    return route


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_route(slug: str, session: Session = Depends(get_session)):
    """Soft delete a route by setting active=False (admin only)."""
    route = session.query(Route).filter(Route.slug == slug).first()
    if not route:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Route not found",
        )

    route.active = False
    session.add(route)
    session.commit()
    return None