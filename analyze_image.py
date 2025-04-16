#!/usr/bin/env python3
import sys
import os
import base64
import requests
import json

def analyze_traffic_sign(image_path):
    """
    Analyze a traffic sign image using Google's Gemini API
    """
    # Get API key from environment
    api_key = 'AIzaSyDomYRj1av6N67ZlbCGcIaA9aWZRZ7Vj0Y'
    
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set")
        sys.exit(1)
    
    # Check if file exists
    if not os.path.exists(image_path):
        print(f"Error: Image file not found: {image_path}")
        sys.exit(1)
    
    try:
        # Read and encode the image
        with open(image_path, 'rb') as image_file:
            image_data = image_file.read()
            base64_image = base64.b64encode(image_data).decode('utf-8')
        
        print(f"[DEBUG] Image loaded: {image_path} ({len(image_data)} bytes)")
        
        # Prepare the request to Gemini API - updated to use Gemini 2.0 Flash
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key={api_key}"
        
        payload = {
            "contents": [{
                "parts": [
                    {"text": "Identify this traffic sign. If it's a traffic sign, output ONLY the name of the sign with no explanation or additional text. If it's not a traffic sign, just say 'Not a traffic sign'."},
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": base64_image
                        }
                    }
                ]
            }],
            "generation_config": {
                "temperature": 0.2,
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 100
            }
        }
        
        print("[DEBUG] Sending request to Gemini API")
        print(f"[DEBUG] API URL: {url}")
        print(f"[DEBUG] Request prompt: \"{payload['contents'][0]['parts'][0]['text']}\"")
        
        # Make the API call
        response = requests.post(url, json=payload)
        
        print(f"[DEBUG] Response status code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            print(f"[DEBUG] Error details: {response.text}")
            sys.exit(1)
        
        # Extract the text response
        result = response.json()
        
        # Print the response in a clearly formatted way
        print("\n=== GEMINI API RESPONSE START ===")
        try:
            print(json.dumps(result, indent=2))
        except:
            print(str(result))
        print("=== GEMINI API RESPONSE END ===\n")
        
        # Extract the text from the response
        try:
            # Try to extract from standard response format
            if 'candidates' in result and len(result['candidates']) > 0:
                if 'content' in result['candidates'][0]:
                    if 'parts' in result['candidates'][0]['content'] and len(result['candidates'][0]['content']['parts']) > 0:
                        sign_name = result['candidates'][0]['content']['parts'][0]['text'].strip()
                    else:
                        sign_name = result['candidates'][0]['content'].get('text', '').strip()
                else:
                    # Try alternative formats that might be used
                    sign_name = result['candidates'][0].get('text', '').strip()
            elif 'text' in result:
                # Direct text field in response
                sign_name = result['text'].strip()
            else:
                # If we can't find the expected fields, use the whole response
                sign_name = str(result).strip()
                
            # If we got an empty response or failed to parse, set as unknown
            if not sign_name:
                sign_name = "Unknown (empty response)"
                
            print(f"[DEBUG] Extracted sign name: '{sign_name}'")
        except (KeyError, IndexError) as e:
            print(f"[DEBUG] Error extracting sign name: {str(e)}")
            print(f"[DEBUG] Response keys: {result.keys() if isinstance(result, dict) else 'Not a dictionary'}")
            if 'candidates' in result:
                print(f"[DEBUG] Candidates length: {len(result['candidates'])}")
                if len(result['candidates']) > 0:
                    print(f"[DEBUG] First candidate keys: {result['candidates'][0].keys()}")
            sign_name = "Unknown (parsing error)"
        
        # Output in format the server can easily parse
        print(f"🔍 Gemini says: {sign_name}")
        return sign_name
        
    except Exception as e:
        print(f"Error: {str(e)}")
        print(f"[DEBUG] Exception details: {type(e).__name__}: {str(e)}")
        import traceback
        print(f"[DEBUG] Traceback: {traceback.format_exc()}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python analyze_image.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    print(f"[DEBUG] Starting analysis for image: {image_path}")
    analyze_traffic_sign(image_path) 