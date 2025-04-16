import tensorflow as tf
import tensorflowjs as tfjs
import os
import argparse
import json
from pathlib import Path

def create_model():
    """Create a traffic sign recognition model as specified in the user's code."""
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(43, activation='softmax')  # 43 traffic sign classes
    ])
    
    model.compile(optimizer='adam',
                 loss='sparse_categorical_crossentropy',
                 metrics=['accuracy'])
    
    return model

def convert_model_to_tfjs(model, output_dir):
    """Convert the model to TensorFlow.js format."""
    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert the model to TensorFlow.js format
    tfjs.converters.save_keras_model(model, output_dir)
    print(f"Model converted successfully and saved to {output_dir}")
    
    # Create a classes.json file with class names
    class_names = [
        'Speed limit (20km/h)',
        'Speed limit (30km/h)',
        'Speed limit (50km/h)',
        'Speed limit (60km/h)',
        'Speed limit (70km/h)',
        'Speed limit (80km/h)',
        'End of speed limit (80km/h)',
        'Speed limit (100km/h)',
        'Speed limit (120km/h)',
        'No passing',
        'No passing for vehicles over 3.5 tons',
        'Right-of-way at the next intersection',
        'Priority road',
        'Yield',
        'Stop',
        'No vehicles',
        'Vehicles over 3.5 tons prohibited',
        'No entry',
        'General caution',
        'Dangerous curve to the left',
        'Dangerous curve to the right',
        'Double curve',
        'Bumpy road',
        'Slippery road',
        'Road narrows on the right',
        'Road work',
        'Traffic signals',
        'Pedestrians',
        'Children crossing',
        'Bicycles crossing',
        'Beware of ice/snow',
        'Wild animals crossing',
        'End of all speed and passing limits',
        'Turn right ahead',
        'Turn left ahead',
        'Ahead only',
        'Go straight or right',
        'Go straight or left',
        'Keep right',
        'Keep left',
        'Roundabout mandatory',
        'End of no passing',
        'End of no passing by vehicles over 3.5 tons'
    ]
    
    with open(os.path.join(output_dir, 'classes.json'), 'w') as f:
        json.dump({"classes": class_names}, f, indent=2)
    
    print(f"Class names saved to {os.path.join(output_dir, 'classes.json')}")

def load_and_convert_model(model_path, output_dir):
    """Load a trained model from file and convert it to TensorFlow.js format."""
    try:
        # Load the trained model
        model = tf.keras.models.load_model(model_path)
        print(f"Model loaded successfully from {model_path}")
        
        # Convert to TensorFlow.js format
        convert_model_to_tfjs(model, output_dir)
        return True
    except Exception as e:
        print(f"Error loading or converting model: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Convert TensorFlow model to TensorFlow.js format')
    parser.add_argument('--model_path', type=str, help='Path to the trained model file')
    parser.add_argument('--output_dir', type=str, default='public/models', 
                        help='Directory to save the converted model')
    parser.add_argument('--create_new', action='store_true', 
                        help='Create a new model instead of loading from a file')
    
    args = parser.parse_args()
    
    if args.create_new:
        print("Creating a new model...")
        model = create_model()
        convert_model_to_tfjs(model, args.output_dir)
    else:
        if not args.model_path:
            print("Error: model_path is required unless --create_new flag is used")
            parser.print_help()
            return
        
        success = load_and_convert_model(args.model_path, args.output_dir)
        if not success:
            print("Falling back to creating a new model...")
            model = create_model()
            convert_model_to_tfjs(model, args.output_dir)

if __name__ == "__main__":
    main() 