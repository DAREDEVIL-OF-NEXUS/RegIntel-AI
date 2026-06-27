import time
from typing import Dict
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# In production, use python-jose and a real secret key
SECRET_KEY = "hackathon-secret"
security = HTTPBearer()

def create_access_token(username: str, role: str) -> str:
    """Mock JWT creation for Phase 4."""
    # Simulating a JWT by encoding data in a string
    return f"{username}:{role}:{int(time.time())}"

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict[str, str]:
    """Mock JWT verification."""
    token = credentials.credentials
    try:
        parts = token.split(":")
        if len(parts) != 3:
            raise ValueError()
        
        username, role, timestamp = parts
        return {"username": username, "role": role}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

def get_current_user(token_data: Dict[str, str] = Depends(verify_token)):
    """FastAPI dependency to get the current user."""
    return token_data

def require_admin(user: Dict[str, str] = Depends(get_current_user)):
    """FastAPI dependency enforcing Admin RBAC."""
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user
