#!/usr/bin/env python3
import argparse
import base64
import json
import os
import requests
import sys
from PIL import Image
import io

def encode_image(image_path):
    """Encode image to base64."""
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        print(json.dumps({"error": f"Failed to read image: {str(e)}"}), file=sys.stderr)
        sys.exit(1)

def identify_traffic_sign(image_path):
    """Use Gemini API to identify a traffic sign."""
    # Get API key from environment
    api_key = 'AIzaSyDomYRj1av6N67ZlbCGcIaA9aWZRZ7Vj0Y'
    if not api_key:
        print("🔍 Gemini says: Unknown (API key not found)")
        sys.exit(1)
    
    # Prepare the image
    base64_image = encode_image(image_path)
    
    # Gemini API endpoint
    url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"
    
    # Request data
    payload = {
        "contents": [{
            "parts": [
                {"text": "What traffic sign is shown in this image? Reply with only the name of the sign. For example: 'Stop sign', 'Yield sign', etc."},
                {
                    "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": base64_image
                    }
                }
            ]
        }],
        "generationConfig": {
            "temperature": 0.2,
            "topP": 0.8,
            "topK": 40,
            "maxOutputTokens": 100
        }
    }
    
    # Make the API request
    try:
        response = requests.post(
            f"{url}?key={api_key}",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"🔍 Gemini says: Unknown (API error: {response.status_code})")
            return
        
        # Process the response
        result = response.json()
        if "candidates" in result and len(result["candidates"]) > 0:
            text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
            print(f"🔍 Gemini says: {text}")
        else:
            print("🔍 Gemini says: Unknown (No result from API)")
    
    except Exception as e:
        print(f"🔍 Gemini says: Unknown (Error: {str(e)})")
        sys.exit(1)
    
def main():
    # Parse arguments
    parser = argparse.ArgumentParser(description='Identify traffic signs in images')
    parser.add_argument('--image_path', type=str, required=True, help='Path to the image file')
    args = parser.parse_args()
    
    # Check if file exists
    if not os.path.exists(args.image_path):
        print(json.dumps({"error": f"Image file not found: {args.image_path}"}), file=sys.stderr)
        sys.exit(1)
    
    # Identify the traffic sign
    identify_traffic_sign(args.image_path)

if __name__ == "__main__":
    main()
