import os
from flask import Flask, send_from_directory, request, jsonify

app = Flask(__name__, static_folder='.', static_url_path='')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dhanushree-portfolio-2026')

@app.route('/')
def index():
    """Serves the main portfolio single page application."""
    return send_from_directory('.', 'index.html')

@app.route('/resume')
def download_resume():
    """Direct resume PDF download endpoint."""
    return send_from_directory('.', 'Dhanushree_VM_Resume.pdf', as_attachment=True, download_name='Dhanushree_VM_Resume.pdf')

@app.route('/contact', methods=['POST'])
def contact():
    """Simulates contact form submission endpoint with validation."""
    data = request.get_json(silent=True) or request.form
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not name or not email or not message:
        return jsonify({"success": False, "error": "Please fill out name, email, and message."}), 400
    return jsonify({"success": True, "message": f"Thank you {name}! Your message has been received."}), 200

if __name__ == '__main__':
    print("Serving Dhanushree's Portfolio at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
