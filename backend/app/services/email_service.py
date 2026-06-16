import resend
from app.config import Settings

settings = Settings()

resend.api_key = settings.RESEND_API_KEY


def send_confirmation_email(
    to_email: str,
    customer_name: str,
    booking_id: int,
    route_info: dict,
    date: str,
    time: str,
    passengers: int,
    amount_paid: float,
) -> dict:
    """
    Send booking confirmation email to customer.
    """
    subject = f"Booking Confirmation #{booking_id}"
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #082419;">Booking Confirmed!</h1>
        <p>Dear {customer_name},</p>
        <p>Your transfer booking has been confirmed. Here are your details:</p>

        <div style="background-color: #f4f3f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Reference:</strong> #{booking_id}</p>
            <p><strong>Route:</strong> {route_info.get('origin', 'N/A')} → {route_info.get('destination', 'N/A')}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Passengers:</strong> {passengers}</p>
            <p><strong>Amount Paid:</strong> ${amount_paid:.2f} USD</p>
        </div>

        <p>Your driver will meet you at the designated pickup location. Please have your booking confirmation ready.</p>
        <p>If you have any questions or need to make changes to your booking, please contact us.</p>
        <p>Thank you for choosing CostaWay!</p>
        <p>Best regards,<br>The CostaWay Team</p>
    </body>
    </html>
    """

    return resend.Emails.send(
        {
            "from": settings.RESEND_FROM_EMAIL,
            "to": to_email,
            "subject": subject,
            "html": html_content,
        }
    )


def send_internal_notification(
    booking_data: dict,
    notification_type: str = "booking",
) -> dict:
    """
    Send internal notification email to admin when a new booking or quote request comes in.
    """
    if notification_type == "booking":
        subject = f"New Booking: {booking_data.get('customer_name', 'Unknown')} - #{booking_data.get('id', 'N/A')}"
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #082419;">New Booking Received</h1>
            <div style="background-color: #f4f3f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Booking ID:</strong> #{booking_data.get('id', 'N/A')}</p>
                <p><strong>Customer:</strong> {booking_data.get('customer_name', 'N/A')}</p>
                <p><strong>Email:</strong> {booking_data.get('email', 'N/A')}</p>
                <p><strong>Phone:</strong> {booking_data.get('phone', 'N/A')}</p>
                <p><strong>Route:</strong> {booking_data.get('origin', 'N/A')} → {booking_data.get('destination', 'N/A')}</p>
                <p><strong>Date:</strong> {booking_data.get('date', 'N/A')}</p>
                <p><strong>Time:</strong> {booking_data.get('time', 'N/A')}</p>
                <p><strong>Passengers:</strong> {booking_data.get('passengers', 'N/A')}</p>
                <p><strong>Amount:</strong> ${booking_data.get('amount_due', 0):.2f} USD</p>
                <p><strong>Payment Status:</strong> {booking_data.get('payment_status', 'N/A')}</p>
            </div>
        </body>
        </html>
        """
    else:
        subject = f"New Quote Request: {booking_data.get('customer_name', 'Unknown')}"
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #082419;">New Quote Request</h1>
            <div style="background-color: #f4f3f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Request ID:</strong> #{booking_data.get('id', 'N/A')}</p>
                <p><strong>Customer:</strong> {booking_data.get('customer_name', 'N/A')}</p>
                <p><strong>Email:</strong> {booking_data.get('email', 'N/A')}</p>
                <p><strong>Phone:</strong> {booking_data.get('phone', 'N/A')}</p>
                <p><strong>Route:</strong> {booking_data.get('origin', 'N/A')} → {booking_data.get('destination', 'N/A')}</p>
                <p><strong>Date:</strong> {booking_data.get('date', 'N/A')}</p>
                <p><strong>Passengers:</strong> {booking_data.get('passengers', 'N/A')}</p>
                <p><strong>Notes:</strong> {booking_data.get('notes', 'N/A')}</p>
            </div>
        </body>
        </html>
        """

    return resend.Emails.send(
        {
            "from": settings.RESEND_FROM_EMAIL,
            "to": settings.ADMIN_EMAIL,
            "subject": subject,
            "html": html_content,
        }
    )