import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

GMAIL_USER = os.getenv("GMAIL_USER", "recallmabika@gmail.com")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "recallmabika@gmail.com")
PORT = int(os.getenv("PORT", 5000))

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Portfolio Mail Service",
        "configured": bool(GMAIL_APP_PASSWORD)
    }), 200

@app.route("/api/contact", methods=["POST"])
def send_contact_email():
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({"success": False, "error": "Invalid JSON payload"}), 400

    name = (data.get("name") or "").strip()
    sender_email = (data.get("email") or "").strip()
    subject = (data.get("subject") or data.get("title") or "Portfolio Inquiry").strip()
    message = (data.get("message") or "").strip()

    if not name or not sender_email or not message:
        return jsonify({
            "success": False,
            "error": "Missing required fields (name, email, and message are required)"
        }), 400

    if not GMAIL_APP_PASSWORD:
        return jsonify({
            "success": False,
            "error": "GMAIL_APP_PASSWORD is not configured in backend/.env"
        }), 500

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Portfolio Inquiry: {subject}"
        msg["From"] = f"{name} <{GMAIL_USER}>"
        msg["To"] = RECIPIENT_EMAIL
        msg["Reply-To"] = sender_email

        plain_text = f"""You received a new message from your portfolio website:

Name: {name}
Email: {sender_email}
Subject: {subject}

Message:
{message}
"""

        html_text = f"""<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; color: #111;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
    <div style="background: #000000; color: #ffffff; padding: 16px 20px;">
      <h2 style="margin: 0; font-size: 15px; letter-spacing: 1px; text-transform: uppercase;">Portfolio Message Received</h2>
    </div>
    <div style="padding: 20px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; font-weight: bold; width: 80px; color: #666;">Name:</td>
          <td style="padding: 6px 0; color: #111;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666;">Email:</td>
          <td style="padding: 6px 0;"><a href="mailto:{sender_email}" style="color: #0066cc;">{sender_email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666;">Subject:</td>
          <td style="padding: 6px 0; color: #111;">{subject}</td>
        </tr>
      </table>
      
      <div style="background: #f9f9f9; border-left: 3px solid #000000; padding: 14px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #222;">{message}</div>
      
      <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        Click 'Reply' in Gmail to respond directly to {name} ({sender_email}).
      </div>
    </div>
  </div>
</body>
</html>
"""

        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_text, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, [RECIPIENT_EMAIL], msg.as_string())

        return jsonify({
            "success": True,
            "message": "Transmission delivered directly via Gmail SMTP."
        }), 200

    except Exception as e:
        print(f"SMTP Error: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Failed to deliver transmission: {str(e)}"
        }), 500

if __name__ == "__main__":
    print(f"Starting Portfolio Mail Service on port {PORT}...")
    app.run(host="0.0.0.0", port=PORT, debug=True)
