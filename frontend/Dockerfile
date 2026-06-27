FROM python:3.10-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir streamlit requests

# Copy frontend code
COPY frontend/ .

EXPOSE 8501

CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
