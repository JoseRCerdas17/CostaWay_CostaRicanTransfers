from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    DATABASE_URL: str = "postgresql://user:password@localhost:5432/costaway"
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24

    STRIPE_SECRET_KEY: str = "sk_test_..."
    STRIPE_WEBHOOK_SECRET: str = "whsec_..."
    STRIPE_PUBLISHABLE_KEY: str = "pk_test_..."

    RESEND_API_KEY: str = "re_..."
    RESEND_FROM_EMAIL: str = "CostaWay <noreply@costaway.com>"
    ADMIN_EMAIL: str = "admin@costaway.com"

    CORS_ORIGINS: list[str] = ["http://localhost:3000", "https://*.vercel.app"]

    API_V1_PREFIX: str = "/api/v1"