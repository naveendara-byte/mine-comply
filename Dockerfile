# Use Python 3.9 (or your preferred version)
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (usually 8080 for Google Cloud)
EXPOSE 8080

# Command to run your app (Change 'app:app' to match your main file name)
CMD ["gunicorn", "--bind", ":8080", "--workers", "1", "--threads", "8", "app:app"]
