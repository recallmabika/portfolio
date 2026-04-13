import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from dotenv import load_dotenv
from datetime import datetime
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Email Configuration
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USER = os.getenv('EMAIL_USER', '')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD', '')
EMAIL_RECEIVER = os.getenv('EMAIL_RECEIVER', 'recallmabika@gmail.com')

def send_email_notification(name, email, subject, message):
    """Send email notification using SMTP"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = EMAIL_RECEIVER
        msg['Subject'] = f"Portfolio Contact: {subject}"
        
        # Create HTML email body
        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 20px; border-radius: 10px 10px 0 0;">
                <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px;">
                <p style="margin: 10px 0;"><strong style="color: #1e293b;">Name:</strong> <span style="color: #475569;">{name}</span></p>
                <p style="margin: 10px 0;"><strong style="color: #1e293b;">Email:</strong> <span style="color: #475569;">{email}</span></p>
                <p style="margin: 10px 0;"><strong style="color: #1e293b;">Subject:</strong> <span style="color: #475569;">{subject}</span></p>
                <hr style="border: 1px solid #cbd5e1; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #1e293b;">Message:</strong></p>
                <p style="color: #475569; background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">{message}</p>
                <hr style="border: 1px solid #cbd5e1; margin: 20px 0;">
                <p style="color: #64748b; font-size: 12px; text-align: center;">Sent from Portfolio Contact Form • {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </div>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(body, 'html'))
        
        # Send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def save_message_to_file(name, email, subject, message):
    """Save message to JSON file as backup"""
    try:
        messages_file = 'messages.json'
        messages = []
        
        if os.path.exists(messages_file):
            with open(messages_file, 'r') as f:
                messages = json.load(f)
        
        messages.append({
            'name': name,
            'email': email,
            'subject': subject,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'ip': request.remote_addr
        })
        
        with open(messages_file, 'w') as f:
            json.dump(messages, f, indent=2)
    except Exception as e:
        print(f"File save error: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validation
        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'message': 'All fields are required.'}), 400
        
        if len(name) < 2:
            return jsonify({'success': False, 'message': 'Name must be at least 2 characters.'}), 400
        
        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'message': 'Please enter a valid email address.'}), 400
        
        if len(message) < 10:
            return jsonify({'success': False, 'message': 'Message must be at least 10 characters.'}), 400
        
        # Save to file as backup
        save_message_to_file(name, email, subject, message)
        
        # Send email notification
        email_sent = send_email_notification(name, email, subject, message)
        
        if email_sent:
            return jsonify({'success': True, 'message': 'Message sent successfully!'})
        else:
            return jsonify({'success': False, 'message': 'Failed to send email. Please try again later.'}), 500
            
    except Exception as e:
        print(f"Error in send_message: {e}")
        return jsonify({'success': False, 'message': 'An unexpected error occurred.'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'success': False, 'message': 'Internal server error.'}), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)