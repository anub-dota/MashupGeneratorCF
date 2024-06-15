# Use an official Python runtime as a parent image
FROM python:3.11-alpine

# Set environment variables to avoid interaction prompts during package installation
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN apk update && \
    apk add --no-cache \
    firefox-esr \
    wget \
    tar \
    bash && \
    # Download and install Geckodriver
    wget -q "https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-linux64.tar.gz" -O /tmp/geckodriver.tar.gz && \
    tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin && \
    rm /tmp/geckodriver.tar.gz

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run your Flask app
CMD ["python", "app.py"]
